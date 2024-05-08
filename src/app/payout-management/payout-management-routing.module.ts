import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPayoutComponent} from "./components/list-payout/list-payout.component";

const routes: Routes = [
  {
    path: 'list',
    component: ListPayoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayoutManagementRoutingModule { }
