import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { GainRoutingModule } from './gain/gain-routing.module';
import { GainModule } from './gain/gain.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { PaymentPlatformRoutingModule } from './payment-platform/payment-platform-routing.module';
import { SubscriptionRoutingModule } from './subscription/subscription-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
  
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
    SettingsRoutingModule,
    MatStepperModule,
    GainRoutingModule,
    PaymentPlatformRoutingModule,
    SubscriptionRoutingModule,
    GainModule,
    MatGridListModule
 
  ],

})
export class SettingsModule { }
