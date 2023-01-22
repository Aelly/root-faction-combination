import CombinationUtils from '../CombinationUtil';
import { IFaction } from '../../types/IFaction';

describe('Reach util', () => {
    class FactionMock implements IFaction {
        id: number;
        factionName: string = '';
        reachValue: number;
        factionColor: string = '';
        icon: string = '';
        extensionId: number = 0;
        requiredFactionId?: number;

        constructor(id: number, reachValue: number) {
            this.id = id;
            this.reachValue = reachValue;
        }
    }

    const f1: FactionMock = new FactionMock(0, 10);
    const f2: FactionMock = new FactionMock(1, 8);
    const f3: FactionMock = new FactionMock(2, 5);
    const f4: FactionMock = new FactionMock(3, 5);
    const f5: FactionMock = new FactionMock(4, 3);
    const f6: FactionMock = new FactionMock(5, 2);
    f6.requiredFactionId = 3;

    const factionList: IFaction[] = [f1, f2, f3, f4, f5, f6];
    const testSelectedEmpty: IFaction[] = [];
    const testSelectedElemenButNotFilled: IFaction[] = [f1, f2];
    const testSelectedFilled: IFaction[] = [f1, f2, f3, f4, f5];

    it('Return the correct value depending on the number of player', () => {
        expect(CombinationUtils.getReachValueForPlayer(2)).toBe(17);
        expect(CombinationUtils.getReachValueForPlayer(3)).toBe(18);
        expect(CombinationUtils.getReachValueForPlayer(4)).toBe(21);
        expect(CombinationUtils.getReachValueForPlayer(5)).toBe(25);
        expect(CombinationUtils.getReachValueForPlayer(6)).toBe(28);
    });

    it('Can compute the total reach value of a game configuration', () => {
        expect(CombinationUtils.getCurrentTotalReach([])).toBe(0);
        expect(CombinationUtils.getCurrentTotalReach([f1])).toBe(10);
        expect(CombinationUtils.getCurrentTotalReach([f1, f2, f3])).toBe(23);
    });

    it('Can check if a configuration is valid', () => {
        // Good number of faction
        expect(CombinationUtils.isConfigurationValid([], 2)).toBe(false);
        expect(CombinationUtils.isConfigurationValid([], 4)).toBe(false);
        expect(CombinationUtils.isConfigurationValid([f1, f2], 3)).toEqual(false);
        expect(CombinationUtils.isConfigurationValid([f1, f2, f3], 3)).toEqual(true);
        expect(CombinationUtils.isConfigurationValid([f1, f2, f3], 2)).toEqual(false);

        // No duplicate faction
        expect(CombinationUtils.isConfigurationValid([f1, f2, f2], 3)).toBe(false);

        // Valid total reach
        expect(CombinationUtils.isConfigurationValid([f1, f2, f3], 3)).toBe(true);
        expect(CombinationUtils.isConfigurationValid([f4, f5, f6], 3)).toBe(false);
    });

    it('Can tell if a given faction is selectionnable for the current state of the game', () => {
        // From an empty configuration
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedEmpty, f1, 5)).toBe(true);
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedEmpty, f1, 2)).toBe(true);
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedEmpty, f2, 2)).toBe(true);
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedEmpty, f3, 2)).toBe(false);
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedEmpty, f6, 2)).toBe(false);

        // From a configuration not filled but with already some faction
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedElemenButNotFilled, f1, 5)).toBe(false);
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedElemenButNotFilled, f3, 3)).toBe(true);
        const testSelectedElemenButNotFilled2: IFaction[] = [f1, f4];
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedElemenButNotFilled2, f6, 3)).toBe(false);

        // From a filled
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedFilled, f1, 1)).toBe(false);
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedFilled, f1, 5)).toBe(false);
        expect(CombinationUtils.canSelectFaction(factionList, testSelectedFilled, f6, 5)).toBe(false);

        // From a configuration with a required faction
        const testRequiredFactionNOK: IFaction[] = [f1];
        const testRequiredFactionOK: IFaction[] = [f1, f4];
        expect(CombinationUtils.canSelectFaction(factionList, testRequiredFactionNOK, f6, 6)).toBe(false);
        expect(CombinationUtils.canSelectFaction(factionList, testRequiredFactionOK, f6, 6)).toBe(true);
    });

    it('Can fill a valid configuration with random faction', () => {
        // From an empty configuration
        let selectedEmpty = CombinationUtils.fillGameRandomly(testSelectedEmpty, 5, factionList);
        expect(CombinationUtils.isConfigurationValid(selectedEmpty, 5)).toBe(true);
        selectedEmpty = CombinationUtils.fillGameRandomly(testSelectedEmpty, 3, factionList);
        expect(CombinationUtils.isConfigurationValid(selectedEmpty, 3)).toBe(true);
        selectedEmpty = CombinationUtils.fillGameRandomly(testSelectedEmpty, 2, factionList);
        expect(CombinationUtils.isConfigurationValid(selectedEmpty, 2)).toBe(true);

        // From a configuration not filled but with already some faction
        const selectedButNotFilled = CombinationUtils.fillGameRandomly(testSelectedElemenButNotFilled, 5, factionList);
        expect(CombinationUtils.isConfigurationValid(selectedButNotFilled, 5)).toBe(true);

        // From a filled configuration
        const selectedFill = CombinationUtils.fillGameRandomly(testSelectedFilled, 5, factionList);
        expect(CombinationUtils.isConfigurationValid(selectedFill, 5)).toBe(true);
    });
});
