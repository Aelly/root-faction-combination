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
            <h4>{extension.extensionName}</h4>
        </div>
    );
};

export default ExtensionComponent;
