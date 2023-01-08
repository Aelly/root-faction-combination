import { FC, useState } from 'react';
import './App.css';
import FactionComponent from './components/FactionComponent';
import { IFaction } from './types/IFaction';
import factionList from './json/faction.json';

const App: FC = () => {
    const CURRENT_PLAY_COUNT_ = 3;
    const CURRENT_TOTAL_PRESENCE_NEEDED = 17;

    const [selectedList, setSelectedList] = useState<IFaction[]>([]);

    const handleFactionClick = (factionToCheck: IFaction): void => {
        const isSelected = selectedList.includes(factionToCheck);
        // Si c'est sélectionné on déselectionne
        if (isSelected) {
            setSelectedList(selectedList.filter((faction) => faction.id !== factionToCheck.id));
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
