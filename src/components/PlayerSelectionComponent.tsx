import React, { ChangeEvent } from 'react';
import './PlayerSelectionComponent.css';

interface Props {
    numberPlayer: number;
    onNumberPlayerChange(newNumberPlayer: number): void;
}

const PlayerSelectionComponent = ({ numberPlayer, onNumberPlayerChange }: Props) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onNumberPlayerChange(+event.target.value);
    };

    return (
        <div className="player-selection">
            <h2>Number of player :</h2>
            <div className="select">
                <select
                    value={numberPlayer}
                    onChange={handleChange}
                >
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
        </div>
    );
};

export default PlayerSelectionComponent;
