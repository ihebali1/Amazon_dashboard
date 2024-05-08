import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaymentPlatformRoutingModule } from './payment-platform-routing.module';
import { PaymentPlatformComponent } from './payment-platform/payment-platform.component';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    PaymentPlatformComponent
  ],
  imports: [
    CommonModule,
    PaymentPlatformRoutingModule,
    FormsModule, 
    FlexLayoutModule,
    ReactiveFormsModule,
    IconModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule
    
  ]
})
export class PaymentPlatformModule { }
