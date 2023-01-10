import { IFaction } from '../types/IFaction';
import './FactionComponent.css';

interface Props {
    faction: IFaction;
    onFactionClick(faction: IFaction): void;
    selected: boolean;
    disabled: boolean;
}

const FactionComponent = ({ faction, onFactionClick, selected, disabled }: Props) => {
    var isSelected = selected ? ' selected' : '';
    var isDisabled = disabled ? ' disabled' : '';
    var className = 'faction-card ' + isSelected + isDisabled;

    return (
        <div
            style={{ color: faction.factionColor }}
            className={className}
            onClick={() => {
                if (!isDisabled) onFactionClick(faction);
            }}
        >
            <h1>{faction.factionName}</h1>
            <h2>{faction.reachValue}</h2>
            <img src={`${process.env.PUBLIC_URL}/icons/${faction.icon}`} />
        </div>
    );
};

export default FactionComponent;
