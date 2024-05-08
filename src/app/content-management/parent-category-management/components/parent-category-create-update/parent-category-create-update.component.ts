import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ParentCategory } from "../../interfaces/parent-category.model";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import icClose from "@iconify/icons-ic/twotone-close";
import icPrint from "@iconify/icons-ic/twotone-print";
import icDownload from "@iconify/icons-ic/twotone-cloud-download";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPerson from "@iconify/icons-ic/twotone-person";
import icMyLocation from "@iconify/icons-ic/twotone-my-location";
import icLocationCity from "@iconify/icons-ic/twotone-location-city";
import icEditLocation from "@iconify/icons-ic/twotone-edit-location";
import { DepartmentService } from "src/app/content-management/department-management/services/department.service";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";

@Component({
  selector: "vex-parent-category-create-update",
  templateUrl: "./parent-category-create-update.component.html",
  styleUrls: ["./parent-category-create-update.component.scss"],
})
export class ParentCategoryCreateUpdateComponent implements OnInit {
  static id = 100;

  form: FormGroup;
  mode: "create" | "update" = "create";

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;
  server: string;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  selectedDepartment: string;
  departments: any[];
  image: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ParentCategoryCreateUpdateComponent>,
    private fb: FormBuilder,
    private departmentService: DepartmentService
  ) {
    this.server = environment.baseUrl;
  }

  ngOnInit() {
    this.departmentService
      .getDepartments()
      .subscribe((data) => (this.departments = data));
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as ParentCategory;
    }

    this.form = this.fb.group({
      id: this.defaults.id,
      name: this.defaults.name,
      arName: this.defaults.arName,
    });
  }

  save() {
    if (this.mode === "create") {
      this.createParentCategory();
    } else if (this.mode === "update") {
      this.updateParentCategory();
    }
  }

  createParentCategory() {
    const parentCategory = this.form.value;
    delete parentCategory.id;
    parentCategory.image = this.image;
    this.dialogRef.close(parentCategory);
  }

  updateParentCategory() {
    const parentCategory = this.form.value;
    parentCategory.department = this.selectedDepartment;
    if(this.image)
    this.dialogRef.close({ parentCategory, image: this.image });
    else this.dialogRef.close(parentCategory);
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

  onFileInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        //this.image = reader.result;
        //console.log(this.image);
        var img = new Image();
        img.src = reader.result as string;
        img.addEventListener("load", () => {
          let width = img.width;
          let height = img.height;
          console.log(width, height);
          if (width  != height)
            Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: "error",
              title: "يجب أن تكون دقة الصورة 300 × 300 ",
              timer: 2500,
            });
          else this.image = reader.result;
        });
      }
    };

    reader.readAsDataURL(files[0]);
  }
}
