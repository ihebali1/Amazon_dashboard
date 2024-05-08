import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentPlatformComponent } from './payment-platform/payment-platform.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentPlatformComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentPlatformRoutingModule { }
