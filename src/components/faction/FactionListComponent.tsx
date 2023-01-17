import './FactionListComponent.css';

import { IExtension, IFaction } from '../../types/IFaction';

import CombinationUtils from '../../utils/CombinationUtil';
import FactionComponent from './FactionComponent';
import React from 'react';
import extensionList from '../../json/extension.json';
import factionList from '../../json/faction.json';

interface Props {
    selectedList: IFaction[];
    setSelectedList: React.Dispatch<React.SetStateAction<IFaction[]>>;
    extensionSelectedList: IExtension[];
    numberPlayer: number;
}

const FactionListComponent = ({ selectedList, setSelectedList, extensionSelectedList, numberPlayer }: Props) => {
    const handleFactionClick = (factionToCheck: IFaction): void => {
        const isSelected = selectedList.includes(factionToCheck);
        // Si c'est sélectionné on déselectionne
        if (isSelected) {
            // Si on désélectionné le vagabond 1, on va aussi déselectionner le vagabond 2
            setSelectedList(
                selectedList.filter((faction) => {
                    if (factionToCheck.id === 3) {
                        return faction.id !== 7 && faction.id !== factionToCheck.id;
                    } else {
                        return faction.id !== factionToCheck.id;
                    }
                })
            );
        } else {
            setSelectedList([...selectedList, factionToCheck]);
        }
    };

    return (
        <div className="factionList">
            {factionList
                .filter(
                    (faction) =>
                        faction.extensionId === 0 ||
                        extensionSelectedList.some((extension) => extension.id === faction.extensionId)
                )
                .sort((a, b) => b.reachValue - a.reachValue)
                .map((faction: IFaction) => {
                    const isSelected = selectedList.includes(faction);
                    const isDisabled =
                        !isSelected &&
                        CombinationUtils.canPickFaction(factionList, selectedList, faction, numberPlayer);

                    let canDisplay = true;
                    // Check pour afficher le 2e vagabond que si le 1er est sélectionné
                    if (faction.id === 7) {
                        canDisplay = selectedList.some((faction) => faction.id === 3);
                    }

                    return (
                        canDisplay && (
                            <FactionComponent
                                key={faction.id}
                                faction={faction}
                                extension={
                                    extensionList.find((extension) => extension.id === faction.extensionId) ??
                                    extensionList[0]
                                }
                                onFactionClick={handleFactionClick}
                                selected={isSelected}
                                disabled={isDisabled}
                            />
                        )
                    );
                })}
        </div>
    );
};

export default FactionListComponent;
