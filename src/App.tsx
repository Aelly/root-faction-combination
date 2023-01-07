import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import FactionComponent from './components/FactionComponent';
import { IFaction } from './types/IFaction';

const App: FC = () => {
    const [factionList, setFactionList] = useState<IFaction[]>([]);
    const [selectedList, setSelectedList] = useState<IFaction[]>([]);

    const marquise = { factionName: 'Marquise', presencePoint: 10 };
    const duchy = { factionName: 'Duchy', presencePoint: 8 };
    const eyrie = { factionName: 'Eyrie', presencePoint: 7 };

    useEffect(() => {
        const createFactionList = () => {
            console.log('Création de la liste de faction');
            const factionList = [marquise, duchy, eyrie];
            setFactionList(factionList);
        };

        createFactionList();
    }, []);

    const handleFactionClick = (factionToCheck: IFaction): void => {
        const isSelected = selectedList.includes(factionToCheck);
        // Si c'est sélectionné on déselectionne
        if (isSelected) {
            setSelectedList(selectedList.filter((faction) => faction.factionName != factionToCheck.factionName));
        } else {
            setSelectedList([...selectedList, factionToCheck]);
        }
        console.log(selectedList);
    };

    return (
        <div className="App">
            <h1>Root faction combination</h1>
            <div className="todoList">
                {factionList.map((faction: IFaction, key: number) => {
                    const isSelected = selectedList.includes(faction);
                    return (
                        <FactionComponent
                            key={key}
                            faction={faction}
                            onFactionClick={handleFactionClick}
                            selected={isSelected}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
