import { FC, useState } from 'react';
import './App.css';
import FactionComponent from './components/FactionComponent';
import { IFaction } from './types/IFaction';
import factionList from './json/faction.json';
import PlayerSelectionComponent from './components/PlayerSelectionComponent';

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
            setSelectedList(selectedList.filter((faction) => faction.id !== factionToCheck.id));
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
            <h1>Root faction combination</h1>
            <PlayerSelectionComponent
                numberPlayer={numberPlayer}
                onNumberPlayerChange={handleNumberPlayerChange}
            />
            <h2>
                {currentTotalPresence} / {reachNeeded}+
            </h2>
            <div className="factionList">
                {factionList.map((faction: IFaction, key: number) => {
                    const isSelected = selectedList.includes(faction);
                    const isDisabled =
                        !isSelected &&
                        (faction.reachValue + maxReachForCurrent < reachNeeded - currentTotalPresence ||
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
