import './App.css';

import { FC, useState } from 'react';
import { IExtension, IFaction } from './types/IFaction';

import CombinationUtils from './utils/CombinationUtil';
import FactionListComponent from './components/faction/FactionListComponent';
import ParameterComponent from './components/parameters/ParameterComponent';
import factionList from './json/faction.json';
import logo from './assets/logo.png';

// The root of the application, contain the explanation at the top, the two buttons and all the other component.
// The three state of the application (faction selected, extension selected and number of player) are stored here.
const App: FC = () => {
    const [selectedFactionList, setSelectedFactionList] = useState<IFaction[]>([]);
    const [selectedExtensionList, setSelectedExtensionList] = useState<IExtension[]>([]);
    const [numberPlayer, setNumberPlayer] = useState<number>(4);

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
                    selectedFactionList={selectedFactionList}
                    setSelectedFactionList={setSelectedFactionList}
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
