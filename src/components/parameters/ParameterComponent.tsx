import React from 'react';
import { IExtension, IFaction } from '../../types/IFaction';
import PlayerSelectionComponent from '../PlayerSelectionComponent';
import ExtensionListComponent from './extension/ExtensionListComponent';

interface Props {
    numberPlayer: number;
    setNumberPlayer: React.Dispatch<React.SetStateAction<number>>;
    selectedExtensionList: IExtension[];
    setSelectedExtensionList: React.Dispatch<React.SetStateAction<IExtension[]>>;
    setSelectedFactionList: React.Dispatch<React.SetStateAction<IFaction[]>>;
    reachNeeded: number;
    currentTotalReach: number;
}

const ParameterComponent = ({
    numberPlayer,
    setNumberPlayer,
    selectedExtensionList,
    setSelectedExtensionList,
    setSelectedFactionList,
    reachNeeded,
    currentTotalReach,
}: Props) => {
    const handleNumberPlayerChange = (newNumberPlayer: number): void => {
        setNumberPlayer(newNumberPlayer);
        if (newNumberPlayer < numberPlayer) setSelectedFactionList([]);
    };

    const handleExtensionSelectionChange = (extensionToCheck: IExtension): void => {
        const isSelected = selectedExtensionList.includes(extensionToCheck);
        if (isSelected) {
            setSelectedExtensionList(selectedExtensionList.filter((extension) => extensionToCheck.id != extension.id));
        } else {
            setSelectedExtensionList([...selectedExtensionList, extensionToCheck]);
        }
        setSelectedFactionList([]);
    };

    return (
        <>
            <PlayerSelectionComponent
                numberPlayer={numberPlayer}
                onNumberPlayerChange={handleNumberPlayerChange}
            />

            <h2>{`Reach : ${currentTotalReach}/${reachNeeded}`}</h2>

            <ExtensionListComponent
                selectedList={selectedExtensionList}
                onExtensionSelectionChange={handleExtensionSelectionChange}
            />
        </>
    );
};

export default ParameterComponent;
