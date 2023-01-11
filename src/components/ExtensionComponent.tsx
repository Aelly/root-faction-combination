import { IExtension } from '../types/IFaction';

interface Props {
    extension: IExtension;
    onExtensionClick(extension: IExtension): void;
    selected: boolean;
}

const ExtensionComponent = ({ extension, onExtensionClick, selected }: Props) => {
    <div>
        <h2>{extension.extensionName}</h2>
    </div>;
};

export default ExtensionComponent;
