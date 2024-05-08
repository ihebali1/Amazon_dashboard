import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListReportsComponent} from './components/list-reports/list-reports.component';

const routes: Routes = [

  {
    path: 'list',
    component: ListReportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsManagementRoutingModule { }
