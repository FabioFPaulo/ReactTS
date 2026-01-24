export interface ComponentData {
    title: string;
    subtitle: string;
    fields: IField[];
}

interface IField {
    label: string;
    value: string;
    isLink: boolean;
    linkTo?: string;
}
