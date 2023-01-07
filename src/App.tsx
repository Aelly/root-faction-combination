import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import FactionComponent from './components/FactionComponent';
import { IFaction } from './types/IFaction';

const App: FC = () => {
    const [factionList, setFactionList] = useState<IFaction[]>([]);

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

    return (
        <div className="App">
            <h1>Root faction combination</h1>
            <div className="todoList">
                {factionList.map((task: IFaction, key: number) => {
                    return (
                        <FactionComponent
                            key={key}
                            faction={task}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
