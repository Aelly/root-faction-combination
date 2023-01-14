import './ExtensionListComponent.css';
import extensionList from '../../../json/extension.json';
import { IExtension } from '../../../types/IFaction';
import ExtensionComponent from './ExtensionComponent';

interface Props {
    selectedList: IExtension[];
    onExtensionSelectionChange(extension: IExtension): void;
}

const ExtensionListComponent = ({ selectedList, onExtensionSelectionChange }: Props) => {
    return (
        <div className="extension-list">
            {extensionList.map((extension: IExtension, key: number) => {
                return (
                    extension.id !== 0 && (
                        <ExtensionComponent
                            key={key}
                            extension={extension}
                            onExtensionClick={onExtensionSelectionChange}
                            selected={selectedList.includes(extension)}
                        />
                    )
                );
            })}
        </div>
    );
};

export default ExtensionListComponent;
