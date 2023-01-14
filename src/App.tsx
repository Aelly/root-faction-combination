import './App.css';

import { FC, useState } from 'react';

import { IExtension, IFaction } from './types/IFaction';

import logo from './assets/logo.png';
import extensionList from './json/extension.json';
import FactionListComponent from './components/faction/FactionListComponent';
import ParameterComponent from './components/parameters/ParameterComponent';

const App: FC = () => {
    const [selectedFactionList, setSelectedFactionList] = useState<IFaction[]>([]);
    const [selectedExtensionList, setSelectedExtensionList] = useState<IExtension[]>(extensionList);
    const [numberPlayer, setNumberPlayer] = useState<number>(3);

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
            />
        </div>
    );
};

export default App;
