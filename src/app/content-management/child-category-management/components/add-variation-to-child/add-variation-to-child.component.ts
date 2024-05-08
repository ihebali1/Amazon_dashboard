import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParentCategoryCreateUpdateComponent } from 'src/app/content-management/parent-category-management/components/parent-category-create-update/parent-category-create-update.component';
import { ChildCategoryService } from '../../services/child-category.service';
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
  selector: 'vex-add-variation-to-child',
  templateUrl: './add-variation-to-child.component.html',
  styleUrls: ['./add-variation-to-child.component.scss']
})
export class AddVariationToChildComponent implements OnInit {

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
  selectedChildCategory: any;
  childCategories : any[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ParentCategoryCreateUpdateComponent>,
              private fb: FormBuilder, private childCategoryService: ChildCategoryService) {
  }

  ngOnInit() {
    this.childCategoryService.getAvailableVariations(this.data.id).subscribe(
      (data: any) => {
        this.childCategories = data
        console.log(data)
      }
    )
  
  }

  save() {
      this.createParentCategory();
  }

  createParentCategory() {
    this.dialogRef.close(this.selectedChildCategory.id);
  }

  updateParentCategory() {
    const department = this.form.value;
    this.dialogRef.close(department);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  translateValue(attribute) {
    if(!attribute) return ''
    if(attribute.type == 'SINGLE_CHOICE') {
      attribute.type = 'خيار واحد'
    }
    if(attribute.type == 'MULTIPLE_CHOICES') {
      attribute.type = 'خيارات متعددة'
    }
    return attribute;
  }

}
