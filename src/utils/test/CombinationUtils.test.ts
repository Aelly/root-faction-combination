import CombinationUtils from '../CombinationUtil';
import { IFaction } from '../../types/IFaction';

describe('Reach util', () => {
    class FactionMock implements IFaction {
        id: number = 0;
        factionName: string = '';
        reachValue: number;
        factionColor: string = '';
        icon: string = '';
        extensionId: number = 0;

        constructor(reachValue: number) {
            this.reachValue = reachValue;
        }
    }

    it('Return the correct value depending on the number of player', () => {
        expect(CombinationUtils.getReachValueForPlayer(2)).toBe(17);
        expect(CombinationUtils.getReachValueForPlayer(3)).toBe(18);
        expect(CombinationUtils.getReachValueForPlayer(4)).toBe(21);
        expect(CombinationUtils.getReachValueForPlayer(5)).toBe(25);
        expect(CombinationUtils.getReachValueForPlayer(6)).toBe(28);
    });

    it('Can compute the total reach value of a game configuration', () => {
        const faction1: FactionMock = new FactionMock(10);
        const faction2: FactionMock = new FactionMock(5);
        const faction3: FactionMock = new FactionMock(3);

        expect(CombinationUtils.getCurrentTotalReach([])).toBe(0);
        expect(CombinationUtils.getCurrentTotalReach([faction1])).toBe(10);
        expect(CombinationUtils.getCurrentTotalReach([faction1, faction2, faction3])).toBe(18);
    });

    it.todo('Can fill a valid configuration with random faction', () => {
        const f1: FactionMock = new FactionMock(10);
        const f2: FactionMock = new FactionMock(8);
        const f3: FactionMock = new FactionMock(5);
        const f4: FactionMock = new FactionMock(5);
        const f5: FactionMock = new FactionMock(3);
        const f6: FactionMock = new FactionMock(2);

        const possibleFaction: IFaction[] = [f1, f2, f3, f4, f5, f6];
        const testSelectedEmpty: IFaction[] = [];
        const testSelectedElemenButNotFilled: IFaction[] = [f1, f2];
        const testSelectedFilled: IFaction[] = [f1, f2, f3, f4, f5];

        // Pick the right amount of faction
        expect(CombinationUtils.FillGameRandomly(testSelectedEmpty, 5, possibleFaction).length).toBe(5);
        expect(CombinationUtils.FillGameRandomly(testSelectedElemenButNotFilled, 5, possibleFaction).length).toBe(5);
        expect(CombinationUtils.FillGameRandomly(testSelectedFilled, 5, possibleFaction).length).toBe(5);
        expect(CombinationUtils.FillGameRandomly(testSelectedEmpty, 3, possibleFaction).length).toBe(3);
        expect(CombinationUtils.FillGameRandomly(testSelectedEmpty, 2, possibleFaction).length).toBe(2);

        // Game is valid
        expect(
            CombinationUtils.getCurrentTotalReach(
                CombinationUtils.FillGameRandomly(testSelectedEmpty, 5, possibleFaction)
            )
        ).toBeGreaterThanOrEqual(CombinationUtils.getReachValueForPlayer(5));
        expect(
            CombinationUtils.getCurrentTotalReach(
                CombinationUtils.FillGameRandomly(testSelectedElemenButNotFilled, 5, possibleFaction)
            )
        ).toBeGreaterThanOrEqual(CombinationUtils.getReachValueForPlayer(5));
        expect(
            CombinationUtils.getCurrentTotalReach(
                CombinationUtils.FillGameRandomly(testSelectedFilled, 5, possibleFaction)
            )
        ).toBeGreaterThanOrEqual(CombinationUtils.getReachValueForPlayer(5));
        expect(
            CombinationUtils.getCurrentTotalReach(
                CombinationUtils.FillGameRandomly(testSelectedEmpty, 3, possibleFaction)
            )
        ).toBeGreaterThanOrEqual(CombinationUtils.getReachValueForPlayer(3));
        expect(
            CombinationUtils.getCurrentTotalReach(
                CombinationUtils.FillGameRandomly(testSelectedEmpty, 2, possibleFaction)
            )
        ).toBeGreaterThanOrEqual(CombinationUtils.getReachValueForPlayer(3));
    });
});
