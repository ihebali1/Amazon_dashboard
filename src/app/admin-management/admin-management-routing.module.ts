import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminListComponent} from "./components/admin-list/admin-list.component";
import {AddAdminComponent} from "./components/add-admin/add-admin.component";
import {EditAdminComponent} from "./components/edit-admin/edit-admin.component";

const routes: Routes = [
  {
    path: 'list',
    component: AdminListComponent,
  },
  {
    path: 'add',
    component: AddAdminComponent,
  },
  {
    path: 'edit',
    component: EditAdminComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagementRoutingModule { }
