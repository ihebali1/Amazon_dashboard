import { Component, Inject, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Department } from "../../interfaces/department.model";
import { DepartmentCreateUpdateComponent } from "../department-create-update/department-create-update.component";
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
import { DepartmentService } from "../../services/department.service";
import { ParentCategoryService } from "src/app/content-management/parent-category-management/services/parent-category.service";
import { ParentCategory } from "src/app/content-management/parent-category-management/interfaces/parent-category.model";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";
import { FileService } from "src/app/shared/services/file.service";

@Component({
  selector: "vex-add-parent-category-to-department",
  templateUrl: "./add-parent-category-to-department.component.html",
  styleUrls: ["./add-parent-category-to-department.component.scss"],
})
export class AddParentCategoryToDepartmentComponent implements OnInit {
  form: FormGroup;
  mode: "create" | "update" = "create";

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  selectedParentCategory: any;
  parentCategories: any[];

  name = new FormControl("", [Validators.required]);
  arName = new FormControl("", [Validators.required]);
  image: any;
  server: string;

  constructor(
    private dialogRef: MatDialogRef<DepartmentCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private parentCategoryService: ParentCategoryService,
    private fileService: FileService
  ) {
    this.server = environment.baseUrl;
  }

  ngOnInit() {
    this.departmentService
      .getAvailableParentCategories(this.data.id)
      .subscribe((data: any) => {
        this.parentCategories = data;
      });
  }

  save() {
    this.createParentCategory();
  }

  createParentCategory() {
    this.dialogRef.close(this.selectedParentCategory);
  }

  createNewParentCategory() {
    if (this.arName.valid && this.name.valid && this.image) {
      this.fileService.uploadFile(this.image).subscribe((res: any) => {
        const parentCategory = new ParentCategory({
          arName: this.arName.value,
          name: this.name.value,
          department: this.data.id,
          image: res.id,
        });
        this.parentCategoryService
          .addParentCategory(parentCategory)
          .subscribe(() => this.dialogRef.close(null));
      });
    }
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
          if (width != height)
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

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}
