import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { IconModule } from '@visurel/iconify-angular';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SubscriptionComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SubscriptionRoutingModule,
    MatSelectModule,
    IconModule,
    MatGridListModule,
    MatDividerModule,
    FormsModule, 
    FlexLayoutModule,
    ReactiveFormsModule,
    IconModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class SubscriptionModule { }
