import './App.css';

import { FC, useState } from 'react';

import { IExtension, IFaction } from './types/IFaction';

import logo from './assets/logo.png';
import FactionListComponent from './components/faction/FactionListComponent';
import ParameterComponent from './components/parameters/ParameterComponent';

const App: FC = () => {
    const [selectedFactionList, setSelectedFactionList] = useState<IFaction[]>([]);
    const [selectedExtensionList, setSelectedExtensionList] = useState<IExtension[]>([]);
    const [numberPlayer, setNumberPlayer] = useState<number>(4);

    const reachNeededDictionnary: Map<number, number> = new Map<number, number>();
    reachNeededDictionnary.set(2, 17);
    reachNeededDictionnary.set(3, 18);
    reachNeededDictionnary.set(4, 21);
    reachNeededDictionnary.set(5, 25);
    reachNeededDictionnary.set(6, 28);

    const reachNeeded = reachNeededDictionnary.get(numberPlayer) || 17;
    const currentTotalReach = selectedFactionList.reduce((accumulator, faction) => {
        return accumulator + faction.reachValue;
    }, 0);

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

            <button
                className="reset-btn"
                onClick={() => setSelectedFactionList([])}
            >
                Reset faction selection
            </button>

            <FactionListComponent
                selectedList={selectedFactionList}
                setSelectedList={setSelectedFactionList}
                extensionSelectedList={selectedExtensionList}
                numberPlayer={numberPlayer}
                reachNeeded={reachNeeded}
                currentTotalPresence={currentTotalReach}
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
