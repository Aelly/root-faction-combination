import { IExtension, IFaction } from '../types/IFaction';

import MathUtils from './MathUtil';

export default class CombinationUtils {
    // Return the reach value needed for a configuration to be valid depending on the number of player
    static getReachValueForPlayer(nbPlayer: number): number {
        switch (nbPlayer) {
            case 2:
                return 17;
            case 3:
                return 18;
            case 4:
                return 21;
            case 5:
                return 25;
            case 6:
                return 28;
            default:
                return 17;
        }
    }

    // Return the total reach of the current factions selected
    static getCurrentTotalReach(selectedFaction: IFaction[]): number {
        return selectedFaction.reduce((accumulator, faction) => {
            return accumulator + faction.reachValue;
        }, 0);
    }

    // Filter a list of faction with a list of extension
    static filterByExtenion(factionList: IFaction[], selectedExtensionList: IExtension[]): IFaction[] {
        return factionList.filter(
            (faction) =>
                // An extensionId 0 is the core game -> always showned
                faction.extensionId === 0 ||
                // Else we return the faction only if its extension is selected
                selectedExtensionList.some((extension) => extension.id === faction.extensionId)
        );
    }

    // Return if a faction is pickable in a given game configuration (ie: if choosing this faction will result in a valid game configuration)
    static canSelectFaction(
        factionList: IFaction[],
        factionSelected: IFaction[],
        factionToCheck: IFaction,
        nbPlayer: number
    ) {
        // If the game is already full we can't select any faction
        const factionNeeded = nbPlayer - factionSelected.length;
        if (factionNeeded <= 0) return false;

        // If we already have selected this faction, it can't be selected again
        if (factionSelected.includes(factionToCheck)) return false;

        // If the faction required another faction to be picked before it being pickable
        if (factionToCheck.requiredFactionId !== undefined) {
            if (!factionSelected.some((faction) => faction.id === factionToCheck.requiredFactionId)) return false;
        }

        const factionNotPickedByReach = factionList
            .filter((faction) => !factionSelected.includes(faction))
            .sort((a, b) => b.reachValue - a.reachValue);

        const maxReachForCurrent =
            factionNeeded > 0
                ? factionNotPickedByReach.slice(0, factionNeeded - 1).reduce((accumulator, faction) => {
                      return accumulator + faction.reachValue;
                  }, 0)
                : 0;

        const reachNeeded = CombinationUtils.getReachValueForPlayer(nbPlayer);
        const currentTotalReach = CombinationUtils.getCurrentTotalReach(factionSelected);

        // The faction is selectable only if its reach is enought to produce a valid game
        return factionToCheck.reachValue + maxReachForCurrent >= reachNeeded - currentTotalReach;
    }

    // Return if a game configuration respect all the rule
    static isConfigurationValid(faction: IFaction[], nbPlayer: number): boolean {
        const numberOfPlayer: boolean = faction.length === nbPlayer;
        const hasDuplicate: boolean = new Set(faction).size !== faction.length;
        const validReachValue: boolean =
            CombinationUtils.getCurrentTotalReach(faction) >= CombinationUtils.getReachValueForPlayer(nbPlayer);

        return numberOfPlayer && !hasDuplicate && validReachValue;
    }

    // Return a valid filled game configuration according to the current state
    static fillGameRandomly(selectedFaction: IFaction[], numberPlayer: number, factionList: IFaction[]): IFaction[] {
        const numberOfFactionToAdd: number = numberPlayer - selectedFaction.length;

        let ret: IFaction[] = [...selectedFaction];
        let possibleFaction: IFaction[];
        let randomIndex = 0;

        for (let i = 0; i < numberOfFactionToAdd; ++i) {
            possibleFaction = factionList.filter((f) =>
                CombinationUtils.canSelectFaction(factionList, ret, f, numberPlayer)
            );
            randomIndex = MathUtils.randomIntFromInterval(0, possibleFaction.length - 1);
            ret = [...ret, possibleFaction[randomIndex]];
        }

        return ret;
    }
}
