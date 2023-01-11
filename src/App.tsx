import './App.css';

import { FC, useState } from 'react';
import FactionComponent from './components/FactionComponent';
import PlayerSelectionComponent from './components/PlayerSelectionComponent';

import { IExtension, IFaction } from './types/IFaction';

import logo from './assets/logo.png';
import factionList from './json/faction.json';
import extensionList from './json/extension.json';

const App: FC = () => {
    const [selectedList, setSelectedList] = useState<IFaction[]>([]);
    const [numberPlayer, setNumberPlayer] = useState<number>(3);

    const reachNeededDictionnary: Map<number, number> = new Map<number, number>();
    reachNeededDictionnary.set(2, 17);
    reachNeededDictionnary.set(3, 18);
    reachNeededDictionnary.set(4, 21);
    reachNeededDictionnary.set(5, 25);
    reachNeededDictionnary.set(6, 28);

    const handleFactionClick = (factionToCheck: IFaction): void => {
        const isSelected = selectedList.includes(factionToCheck);
        // Si c'est sélectionné on déselectionne
        if (isSelected) {
            // Si on désélectionné le vagabond 1, on va aussi déselectionner le vagabond 2
            setSelectedList(
                selectedList.filter((faction) => {
                    if (factionToCheck.id == 3) {
                        setSelectedList(
                            selectedList.filter((faction) => faction.id !== 7 && faction.id != factionToCheck.id)
                        );
                    } else {
                        return faction.id !== factionToCheck.id;
                    }
                })
            );
        } else {
            setSelectedList([...selectedList, factionToCheck]);
        }
    };

    const handleNumberPlayerChange = (newNumberPlayer: number): void => {
        setNumberPlayer(newNumberPlayer);
        if (newNumberPlayer < numberPlayer) setSelectedList([]);
    };

    const reachNeeded = reachNeededDictionnary.get(numberPlayer) || 17;

    const currentTotalPresence = selectedList.reduce((accumulator, faction) => {
        return accumulator + faction.reachValue;
    }, 0);

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
        <div className="App">
            <div className="header">
                <h1>Root faction combination</h1>
                <PlayerSelectionComponent
                    numberPlayer={numberPlayer}
                    onNumberPlayerChange={handleNumberPlayerChange}
                />
                <h2>
                    Total reach : {currentTotalPresence} / {reachNeeded}+
                </h2>
                <button
                    onClick={() => {
                        setSelectedList([]);
                    }}
                >
                    Reset
                </button>
            </div>
            <div className="factionList">
                {factionList
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

            <img
                className="logo"
                src={logo}
            />
        </div>
    );
};

export default App;
