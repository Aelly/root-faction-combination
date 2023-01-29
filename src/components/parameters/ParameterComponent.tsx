import './ParameterComponent.css';

import { IExtension, IFaction } from '../../types/IFaction';

import CombinationUtils from '../../utils/CombinationUtil';
import ExtensionListComponent from './extension/ExtensionListComponent';
import PlayerSelectionComponent from './player/PlayerSelectionComponent';
import React from 'react';

interface Props {
    numberPlayer: number;
    setNumberPlayer: React.Dispatch<React.SetStateAction<number>>;
    selectedExtensionList: IExtension[];
    setSelectedExtensionList: React.Dispatch<React.SetStateAction<IExtension[]>>;
    selectedFactionList: IFaction[];
    setSelectedFactionList: React.Dispatch<React.SetStateAction<IFaction[]>>;
}

// Container component to wrap the two parametrable parameter of a game : the number of player and the extension owned.
// The management of the corresponding state is handled here and only the current state and a hook to change it is passed to the component below.
const ParameterComponent = ({
    numberPlayer,
    setNumberPlayer,
    selectedExtensionList,
    setSelectedExtensionList,
    selectedFactionList,
    setSelectedFactionList,
}: Props) => {
    const handleNumberPlayerChange = (newNumberPlayer: number): void => {
        setNumberPlayer(newNumberPlayer);
        if (newNumberPlayer < numberPlayer) setSelectedFactionList([]);
    };

    const handleExtensionSelectionChange = (extensionToCheck: IExtension): void => {
        const isSelected = selectedExtensionList.includes(extensionToCheck);
        if (isSelected) {
            setSelectedExtensionList(selectedExtensionList.filter((extension) => extensionToCheck.id !== extension.id));
        } else {
            setSelectedExtensionList([...selectedExtensionList, extensionToCheck]);
        }
        setSelectedFactionList([]);
    };

    const reachNeeded = CombinationUtils.getReachValueForPlayer(numberPlayer);
    const currentTotalReach = CombinationUtils.getCurrentTotalReach(selectedFactionList);

    return (
        <div className="parameters">
            <ExtensionListComponent
                selectedList={selectedExtensionList}
                onExtensionSelectionChange={handleExtensionSelectionChange}
            />

            <section className="reach">
                <PlayerSelectionComponent
                    numberPlayer={numberPlayer}
                    onNumberPlayerChange={handleNumberPlayerChange}
                />

                <h3>{`Reach : ${currentTotalReach}/${reachNeeded}+`}</h3>
            </section>
        </div>
    );
};

export default ParameterComponent;
