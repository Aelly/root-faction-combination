import React from 'react';
import { IFaction } from '../types/IFaction';
import './FactionComponent.css';

interface Props {
    faction: IFaction;
    onFactionClick(faction: IFaction): void;
    selected: boolean;
}

const FactionComponent = ({ faction, onFactionClick, selected }: Props) => {
    var isSelected = selected ? 'selected' : '';
    var className = 'faction-card  ' + isSelected;

    return (
        <div
            className={className}
            onClick={() => onFactionClick(faction)}
        >
            <h1>{faction.factionName}</h1>
            <h2>{faction.presencePoint}</h2>
        </div>
    );
};

export default FactionComponent;
