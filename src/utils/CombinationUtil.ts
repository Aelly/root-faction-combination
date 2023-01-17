import { IFaction } from '../types/IFaction';

export default class CombinationUtils {
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

    static getCurrentTotalReach(selectedFaction: IFaction[]): number {
        return selectedFaction.reduce((accumulator, faction) => {
            return accumulator + faction.reachValue;
        }, 0);
    }

    static FillGameRandomly(
        selectedFaction: IFaction[],
        numberPlayer: number,
        possibleFaction: IFaction[]
    ): IFaction[] {
        return [];
    }
}
