export class Department {
    id: string;
    name: string;
    arName: string;
    labels: any;
    parentCategories: any;
    image?: any;

    constructor(department) {
        this.id = department.id;
        this.name = department.name;
        this.arName = department.arName;
        this.labels = department.labels;
        this.parentCategories = department.parentCategories;
    }
}
