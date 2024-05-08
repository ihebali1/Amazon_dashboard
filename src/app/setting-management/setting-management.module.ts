import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingComponent } from './components/setting/setting.component';
import { SettingManagementRoutingModule } from './setting-management-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SettingManagementRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ]
  ,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SettingManagementModule { }
