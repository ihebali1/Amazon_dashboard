import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: DepartmentListComponent
  },
  {
    path: 'details/:id',
    component: DepartmentDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentManagementRoutingModule { }
