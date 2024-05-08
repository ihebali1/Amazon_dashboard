import { Component, Inject, OnInit } from "@angular/core";
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
import { ParentCategoryCreateUpdateComponent } from "../parent-category-create-update/parent-category-create-update.component";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ParentCategory } from "../../interfaces/parent-category.model";
import { ParentCategoryService } from "../../services/parent-category.service";
import { ChildCategory } from "src/app/content-management/child-category-management/interfaces/child-category.model";
import { ChildCategoryService } from "src/app/content-management/child-category-management/services/child-category.service";

@Component({
  selector: "vex-add-child-category-to-parent",
  templateUrl: "./add-child-category-to-parent.component.html",
  styleUrls: ["./add-child-category-to-parent.component.scss"],
})
export class AddChildCategoryToParentComponent implements OnInit {
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
  selectedChildCategory: any;
  childCategories: any[];

  name = new FormControl("", [Validators.required]);
  arName = new FormControl("", [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ParentCategoryCreateUpdateComponent>,
    private fb: FormBuilder,
    private parentCategoryService: ParentCategoryService,
    private childCategoryService: ChildCategoryService,
  ) {}

  ngOnInit() {
    this.parentCategoryService
      .getAvailablChildCategories(this.data.id)
      .subscribe((data: any) => {
        this.childCategories = data;
      });
  }

  save() {
    this.createChildCategory();
  }

  createChildCategory() {
    this.dialogRef.close(this.selectedChildCategory);
  }

  createNewChildCategory() {
    if (this.arName.valid && this.name.valid) {
      const childCategory = new ChildCategory({
        arName: this.arName.value,
        name: this.name.value,
        parentCategory: this.data.id,
      });
      this.childCategoryService
        .addChildCategory(childCategory)
        .subscribe(() => this.dialogRef.close(null));
    }
  }

  updateParentCategory() {
    const department = this.form.value;
    this.dialogRef.close(department);
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}
