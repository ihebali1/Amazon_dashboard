import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { GainRoutingModule } from './gain-routing.module';
import { GainComponent } from './gain/gain.component';
import { SettingsRoutingModule } from '../settings-routing.module';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { GainService } from '../services/gain.service';
import { MatdialogComponent } from './gain/matdialog/matdialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GainComponent,
    MatdialogComponent
  ],
  imports: [
    CommonModule,
    GainRoutingModule,
    MatCardModule,
    IconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers:[GainService]
})
export class GainModule { }
