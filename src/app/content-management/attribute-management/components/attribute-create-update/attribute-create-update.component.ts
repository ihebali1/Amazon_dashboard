import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChildCategoryCreateUpdateComponent } from 'src/app/content-management/child-category-management/components/child-category-create-update/child-category-create-update.component';
import { ChildCategory } from 'src/app/content-management/child-category-management/interfaces/child-category.model';
import { ParentCategoryService } from 'src/app/content-management/parent-category-management/services/parent-category.service';
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

@Component({
  selector: 'vex-attribute-create-update',
  templateUrl: './attribute-create-update.component.html',
  styleUrls: ['./attribute-create-update.component.scss']
})
export class AttributeCreateUpdateComponent implements OnInit {

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
  selectedType: string;
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
      key: this.defaults.key,
      arKey: this.defaults.arKey,
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
    const attribute = this.form.value;
    delete attribute.id;
    attribute.type = this.selectedType
    this.dialogRef.close(attribute);
  }

  updateChildCategory() {
    const attribute = this.form.value;
    //parentCategory.parentCategory =  this.selectedParentCategory
    attribute.type = this.selectedType
    console.log(attribute);
    this.dialogRef.close(attribute);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
