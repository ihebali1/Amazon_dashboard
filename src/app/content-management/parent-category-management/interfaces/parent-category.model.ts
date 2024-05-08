export class ParentCategory {
    id?: string;
    name: string;
    arName: string;
    labels?: any;
    department: any;
    departmentName?: string;
    childCategories?: any;
    image:any;
    constructor(parentCategory) {
        this.id = parentCategory?.id;
        this.name = parentCategory.name;
        this.arName = parentCategory.arName;
        this.labels = parentCategory?.labels;
        this.department = parentCategory.department;
        this.image = parentCategory?.image;
        this.departmentName= parentCategory?.departmentName
        this.childCategories= parentCategory?.childCategories
    }

    get test(){
        let test = ''
        test =  this.name + this.name
        return test
    }

    set test(value:string){

    }

}
