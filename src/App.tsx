import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import FactionComponent from './components/FactionComponent';
import { IFaction } from './types/IFaction';

const App: FC = () => {
    const CURRENT_PLAY_COUNT_ = 3;
    const CURRENT_TOTAL_PRESENCE_NEEDED = 17;

    const [factionList, setFactionList] = useState<IFaction[]>([]);
    const [selectedList, setSelectedList] = useState<IFaction[]>([]);

    const marquise = { id: 0, factionName: 'Marquise', presencePoint: 10 };
    const duchy = { id: 1, factionName: 'Duchy', presencePoint: 8 };
    const eyrie = { id: 2, factionName: 'Eyrie', presencePoint: 7 };
    const vaga = { id: 3, factionName: 'Vaga', presencePoint: 5 };
    const riverfolk = { id: 4, factionName: 'Riverfolk', presencePoint: 5 };
    const alliance = { id: 5, factionName: 'Alliance', presencePoint: 3 };
    const corvid = { id: 6, factionName: 'Corvid', presencePoint: 3 };
    const vaga2 = { id: 7, factionName: 'Vaga2', presencePoint: 2 };
    const cult = { id: 8, factionName: 'Cult', presencePoint: 2 };

    useEffect(() => {
        const createFactionList = () => {
            console.log('Création de la liste de faction');
            const factionList = [marquise, duchy, eyrie, vaga, riverfolk, alliance, corvid, vaga2, cult];
            setFactionList(factionList);
        };

        createFactionList();
    }, []);

    const handleFactionClick = (factionToCheck: IFaction): void => {
        const isSelected = selectedList.includes(factionToCheck);
        // Si c'est sélectionné on déselectionne
        if (isSelected) {
            setSelectedList(selectedList.filter((faction) => faction.id != factionToCheck.id));
        } else {
            setSelectedList([...selectedList, factionToCheck]);
        }
    };

    const currentTotalPresence = selectedList.reduce((accumulator, faction) => {
        return accumulator + faction.presencePoint;
    }, 0);

    const factionNotPickedByPresence = factionList
        .filter((faction) => !selectedList.includes(faction))
        .sort((a, b) => b.presencePoint - a.presencePoint);
    const factionNeeded = CURRENT_PLAY_COUNT_ - selectedList.length;
    const maxPresenceForCurrent =
        factionNeeded > 0
            ? factionNotPickedByPresence.slice(0, factionNeeded - 1).reduce((accumulator, faction) => {
                  return accumulator + faction.presencePoint;
              }, 0)
            : 0;
    console.log(maxPresenceForCurrent);

    return (
        <div className="App">
            <h1>Root faction combination</h1>
            <h2>
                {currentTotalPresence} / {CURRENT_TOTAL_PRESENCE_NEEDED}
            </h2>
            <div className="factionList">
                {factionList.map((faction: IFaction, key: number) => {
                    const isSelected = selectedList.includes(faction);
                    // const isDisabled = !isSelected && faction.presencePoint < 17 - currentTotalPresence;
                    const isDisabled =
                        !isSelected &&
                        (faction.presencePoint + maxPresenceForCurrent <
                            CURRENT_TOTAL_PRESENCE_NEEDED - currentTotalPresence ||
                            factionNeeded <= 0);
                    return (
                        <FactionComponent
                            key={faction.id}
                            faction={faction}
                            onFactionClick={handleFactionClick}
                            selected={isSelected}
                            disabled={isDisabled}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
