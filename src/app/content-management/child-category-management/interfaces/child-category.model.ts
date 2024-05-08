export class ChildCategory {
    id: string;
    name: string;
    arName: string;
    labels: any;
    parentCategory: any;
    parentCategoryName: string;
    attributes: any;
    variationThemes: any;
    constructor(childCategory) {
        this.id = childCategory.id;
        this.name = childCategory.name;
        this.arName = childCategory.arName;
        this.labels = childCategory.labels;
        this.parentCategory = childCategory.parentCategory;
        this.parentCategoryName= childCategory.parentCategoryName;
        this.attributes= childCategory.attributes;
        this.variationThemes = childCategory.variationThemes;
    }

}
