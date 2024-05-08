import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChildCategory } from '../../interfaces/child-category.model';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import { ParentCategoryService } from 'src/app/content-management/parent-category-management/services/parent-category.service';

@Component({
  selector: 'vex-child-category-create-update',
  templateUrl: './child-category-create-update.component.html',
  styleUrls: ['./child-category-create-update.component.scss']
})
export class ChildCategoryCreateUpdateComponent implements OnInit {

  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';

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
  selectedParentCategory: string;
  parentCategorys: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<ChildCategoryCreateUpdateComponent>,
              private fb: FormBuilder, private parentCategoryService: ParentCategoryService) {
  }

  ngOnInit() {
    this.parentCategoryService.getParentCategories().subscribe(
      data=> this.parentCategorys = data
    )
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as ChildCategory;
    }

    this.form = this.fb.group({
      id: this.defaults.id,
      name: this.defaults.name,
      arName: this.defaults.arName,
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createChildCategory();
    } else if (this.mode === 'update') {
      this.updateChildCategory();
    }
  }

  createChildCategory() {
    const parentCategory = this.form.value;
    delete parentCategory.id;
    this.dialogRef.close(parentCategory);
  }

  updateChildCategory() {
    const parentCategory = this.form.value;
    //parentCategory.parentCategory =  this.selectedParentCategory
    this.dialogRef.close(parentCategory);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
