import { IExtension, IFaction } from '../../types/IFaction';
import './FactionComponent.css';

interface Props {
    faction: IFaction;
    extension: IExtension;
    onFactionClick(faction: IFaction): void;
    selected: boolean;
    disabled: boolean;
}

const FactionComponent = ({ faction, extension, onFactionClick, selected, disabled }: Props) => {
    var isSelected = selected ? ' selected' : '';
    var isDisabled = disabled ? ' disabled' : '';
    var className = 'faction-card ' + isSelected + isDisabled;

    return (
        <div className="faction-container">
            <div
                style={{ color: faction.factionColor }}
                className={className}
                onClick={() => {
                    if (!isDisabled) onFactionClick(faction);
                }}
            >
                <section className="faction-header">
                    <h1>{faction.factionName}</h1>
                </section>

                <section className="faction-content">
                    <img src={`${process.env.PUBLIC_URL}/icons/${faction.icon}`} />
                    <h2>{faction.reachValue}</h2>
                </section>

                <section className="faction-footer">
                    <p>{extension.id != 0 && extension.extensionName}</p>
                </section>
            </div>
        </div>
    );
};

export default FactionComponent;
