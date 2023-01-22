import './App.css';

import { FC, useState } from 'react';
import { IExtension, IFaction } from './types/IFaction';

import CombinationUtils from './utils/CombinationUtil';
import FactionListComponent from './components/faction/FactionListComponent';
import ParameterComponent from './components/parameters/ParameterComponent';
import factionList from './json/faction.json';
import logo from './assets/logo.png';

const App: FC = () => {
    const [selectedFactionList, setSelectedFactionList] = useState<IFaction[]>([]);
    const [selectedExtensionList, setSelectedExtensionList] = useState<IExtension[]>([]);
    const [numberPlayer, setNumberPlayer] = useState<number>(4);

    const reachNeeded = CombinationUtils.getReachValueForPlayer(numberPlayer);
    const currentTotalReach = CombinationUtils.getCurrentTotalReach(selectedFactionList);

    // TODO Récupérer la liste des factions à afficher ici, faire une fonction utilitaire (gestion des extensions) et la passer au factionListComponent (comme ça on peut l'utiliser aussi pour la game random)
    const filteredFactionList = CombinationUtils.filterByExtenion(factionList, selectedExtensionList);

    return (
        <div className="App">
            <div className="header">
                <h1>Root faction combination</h1>

                <div className="explanation">
                    <p>
                        Welcome in the root faction combination checker. The goal of this tool is to help you when
                        choosing the faction before a game of root.
                    </p>

                    <p>To use it :</p>

                    <ol>
                        <li>Select the extension you want to play with</li>
                        <li>Select the number of player in your game</li>
                        <li>Select one by one the faction you want.</li>
                    </ol>

                    <p>
                        If after a choice, a faction become disabled (grayed out) it mean that there is no valid
                        possible configuration that include this faction and the ones you already picked. For a
                        configuration to be valid you need the sum of all the choosen faction to be atleast the reach
                        value indicated (for exemple 17 for 2 players)
                    </p>
                </div>

                <ParameterComponent
                    numberPlayer={numberPlayer}
                    setNumberPlayer={setNumberPlayer}
                    selectedExtensionList={selectedExtensionList}
                    setSelectedExtensionList={setSelectedExtensionList}
                    setSelectedFactionList={setSelectedFactionList}
                    reachNeeded={reachNeeded}
                    currentTotalReach={currentTotalReach}
                />
            </div>

            <div className="buttons">
                <button onClick={() => setSelectedFactionList([])}>Reset faction selection</button>

                <button
                    onClick={() => {
                        setSelectedFactionList(
                            CombinationUtils.fillGameRandomly(selectedFactionList, numberPlayer, filteredFactionList)
                        );
                    }}
                >
                    Fill randomly
                </button>
            </div>

            <FactionListComponent
                factionList={filteredFactionList}
                selectedList={selectedFactionList}
                setSelectedList={setSelectedFactionList}
                numberPlayer={numberPlayer}
            />

            <img
                className="logo"
                src={logo}
                alt="page logo"
            />
        </div>
    );
};

export default App;
