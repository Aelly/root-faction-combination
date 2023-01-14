import './FactionListComponent.css';

import React from 'react';

import FactionComponent from './FactionComponent';

import { IFaction, IExtension } from '../../types/IFaction';

import factionList from '../../json/faction.json';
import extensionList from '../../json/extension.json';

interface Props {
    selectedList: IFaction[];
    setSelectedList: React.Dispatch<React.SetStateAction<IFaction[]>>;
    extensionSelectedList: IExtension[];
    numberPlayer: number;
    reachNeeded: number;
    currentTotalPresence: number;
}

const FactionListComponent = ({
    selectedList,
    setSelectedList,
    extensionSelectedList,
    numberPlayer,
    reachNeeded,
    currentTotalPresence,
}: Props) => {
    const handleFactionClick = (factionToCheck: IFaction): void => {
        const isSelected = selectedList.includes(factionToCheck);
        // Si c'est sélectionné on déselectionne
        if (isSelected) {
            // Si on désélectionné le vagabond 1, on va aussi déselectionner le vagabond 2
            setSelectedList(
                selectedList.filter((faction) => {
                    if (factionToCheck.id == 3) {
                        return faction.id !== 7 && faction.id != factionToCheck.id;
                    } else {
                        return faction.id !== factionToCheck.id;
                    }
                })
            );
        } else {
            setSelectedList([...selectedList, factionToCheck]);
        }
    };

    const factionNotPickedByReach = factionList
        .filter((faction) => !selectedList.includes(faction))
        .sort((a, b) => b.reachValue - a.reachValue);
    const factionNeeded = numberPlayer - selectedList.length;
    const maxReachForCurrent =
        factionNeeded > 0
            ? factionNotPickedByReach.slice(0, factionNeeded - 1).reduce((accumulator, faction) => {
                  return accumulator + faction.reachValue;
              }, 0)
            : 0;

    return (
        <div className="factionList">
            {factionList
                .filter((faction) => extensionSelectedList.some((extension) => extension.id == faction.extensionId))
                .sort((a, b) => b.reachValue - a.reachValue)
                .map((faction: IFaction, key: number) => {
                    const isSelected = selectedList.includes(faction);
                    const isDisabled =
                        !isSelected &&
                        (faction.reachValue + maxReachForCurrent < reachNeeded - currentTotalPresence ||
                            factionNeeded <= 0);

                    let canDisplay = true;
                    // Check pour afficher le 2e vagabond que si le 1er est sélectionné
                    if (faction.id == 7) {
                        canDisplay = selectedList.some((faction) => faction.id == 3);
                    }

                    return (
                        canDisplay && (
                            <FactionComponent
                                key={faction.id}
                                faction={faction}
                                extension={
                                    extensionList.find((extension) => extension.id == faction.extensionId) ??
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
