import './ExtensionComponent.css';
import { IExtension } from '../../../types/IFaction';

interface Props {
    extension: IExtension;
    onExtensionClick(extension: IExtension): void;
    selected: boolean;
}

const ExtensionComponent = ({ extension, onExtensionClick, selected }: Props) => {
    var isSelected = selected ? ' selected' : '';
    var className = 'extension-card ' + isSelected;

    return (
        <div
            className={className}
            onClick={() => onExtensionClick(extension)}
        >
            <h2>{extension.extensionName}</h2>
        </div>
    );
};

export default ExtensionComponent;
