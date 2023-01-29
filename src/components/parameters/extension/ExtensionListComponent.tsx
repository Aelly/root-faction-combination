import './ExtensionListComponent.css';

import ExtensionComponent from './ExtensionComponent';
import { IExtension } from '../../../types/IFaction';
import extensionList from '../../../json/extension.json';

interface Props {
    selectedList: IExtension[];
    onExtensionSelectionChange(extension: IExtension): void;
}

// Simple component the handle the mapping from an IExtension to the ExtensionComponent.
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
