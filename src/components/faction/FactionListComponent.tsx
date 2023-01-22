import './FactionListComponent.css';

import { IExtension, IFaction } from '../../types/IFaction';

import CombinationUtils from '../../utils/CombinationUtil';
import FactionComponent from './FactionComponent';
import React from 'react';
import extensionList from '../../json/extension.json';

interface Props {
    factionList: IFaction[];
    selectedList: IFaction[];
    setSelectedList: React.Dispatch<React.SetStateAction<IFaction[]>>;
    numberPlayer: number;
}

const FactionListComponent = ({ factionList, selectedList, setSelectedList, numberPlayer }: Props) => {
    const handleFactionClick = (factionToCheck: IFaction): void => {
        const isSelected = selectedList.includes(factionToCheck);
        if (isSelected) {
            // If the faction being deselected is required for another selected faction, we deselect the other aswell
            setSelectedList(
                selectedList.filter((faction) => {
                    return faction.id !== factionToCheck.id && faction.requiredFactionId !== factionToCheck.id;
                })
            );
        } else {
            setSelectedList([...selectedList, factionToCheck]);
        }
    };

    return (
        <div className="factionList">
            {factionList
                .sort((a, b) => b.reachValue - a.reachValue)
                .map((faction: IFaction) => {
                    const isSelected = selectedList.includes(faction);
                    const isSelectionable = CombinationUtils.canSelectFaction(
                        factionList,
                        selectedList,
                        faction,
                        numberPlayer
                    );

                    return (
                        <FactionComponent
                            key={faction.id}
                            faction={faction}
                            extension={
                                extensionList.find((extension) => extension.id === faction.extensionId) ??
                                extensionList[0]
                            }
                            onFactionClick={handleFactionClick}
                            selected={isSelected}
                            disabled={!isSelected && !isSelectionable}
                        />
                    );
                })}
        </div>
    );
};

export default FactionListComponent;
