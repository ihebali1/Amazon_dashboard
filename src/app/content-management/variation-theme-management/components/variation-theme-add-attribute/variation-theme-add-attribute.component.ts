import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChildCategoryService } from 'src/app/content-management/child-category-management/services/child-category.service';
import { ParentCategoryCreateUpdateComponent } from 'src/app/content-management/parent-category-management/components/parent-category-create-update/parent-category-create-update.component';
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
import { VariationThemeService } from '../../services/variation-theme.service';

@Component({
  selector: 'vex-variation-theme-add-attribute',
  templateUrl: './variation-theme-add-attribute.component.html',
  styleUrls: ['./variation-theme-add-attribute.component.scss']
})
export class VariationThemeAddAttributeComponent implements OnInit {

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
  selectedAttribute= '';
  attributes : any[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ParentCategoryCreateUpdateComponent>,
              private fb: FormBuilder, private childCategoryService: ChildCategoryService,
              private vtService: VariationThemeService,) {
  }

  getAttributes() {
    this.vtService.getAvailableAttributes(this.data.id).subscribe(
      res => {
        this.attributes = res;
      }
    )
  }

  ngOnInit() {
    this.getAttributes()
    this.form = this.fb.group({
      name: '',
    });
  }

  save() {
      this.createParentCategory();
  }

  createParentCategory() {
    if(this.selectedAttribute.length>0)
    this.dialogRef.close(this.selectedAttribute)
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
