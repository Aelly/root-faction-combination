import React from 'react';
import { IFaction } from '../types/IFaction';
import './FactionComponent.css';

interface Props {
    faction: IFaction;
}

const FactionComponent = ({ faction }: Props) => {
    return (
        <div className="faction-card">
            <h1>{faction.factionName}</h1>
            <h2>{faction.presencePoint}</h2>
        </div>
    );
};

export default FactionComponent;
