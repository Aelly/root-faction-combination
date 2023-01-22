interface IExtension {
    id: number;
    extensionName: string;
}

interface IFaction {
    id: number;
    factionName: string;
    reachValue: number;
    factionColor: string;
    icon: string;
    extensionId: number;
    requiredFactionId?: number;
}

export type { IFaction, IExtension };
