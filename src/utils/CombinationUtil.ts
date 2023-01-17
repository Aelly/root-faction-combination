import { IFaction } from '../types/IFaction';

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

    // Return if a faction is pickable in a given game configuration (ie: if choosing this faction will result in a valid game configuration)
    static canPickFaction(
        factionList: IFaction[],
        factionSelected: IFaction[],
        factionToCheck: IFaction,
        nbPlayer: number
    ) {
        const factionNotPickedByReach = factionList
            .filter((faction) => !factionSelected.includes(faction))
            .sort((a, b) => b.reachValue - a.reachValue);
        const factionNeeded = nbPlayer - factionSelected.length;
        const maxReachForCurrent =
            factionNeeded > 0
                ? factionNotPickedByReach.slice(0, factionNeeded - 1).reduce((accumulator, faction) => {
                      return accumulator + faction.reachValue;
                  }, 0)
                : 0;

        const reachNeeded = CombinationUtils.getReachValueForPlayer(nbPlayer);
        const currentTotalReach = CombinationUtils.getCurrentTotalReach(factionSelected);

        return factionToCheck.reachValue + maxReachForCurrent < reachNeeded - currentTotalReach || factionNeeded <= 0;
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

        for (let i = 0; i < numberOfFactionToAdd; ++i) {
            possibleFaction = factionList.filter((f) => !selectedFaction.includes(f));
            ret = [...ret, possibleFaction[0]];
        }

        return ret;
    }
}
