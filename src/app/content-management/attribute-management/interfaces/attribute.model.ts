export class Attribute {
    id: string;
    key: string;
    arKey: string;
    type: string;
    labels: any;
    childCategories: any;
    constructor(attribute) {
        this.id = attribute.id;
        this.key = attribute.key;
        this.arKey = attribute.arKey;
        this.type = attribute.type;
        this.labels = attribute.labels;
        this.childCategories= attribute.childCategories
    }
}
