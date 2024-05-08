import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddPermissionGroupComponent} from "./component/add-permission-group/add-permission-group.component";
import {ListPermissionGroupComponent} from "./component/list-permission-group/list-permission-group.component";
import {EditPermissionGroupComponent} from "./component/edit-permission-group/edit-permission-group.component";

const routes: Routes = [
  {
    path: 'list',
    component: ListPermissionGroupComponent,
  },
  {
    path: 'add',
    component: AddPermissionGroupComponent,
  },
  {
    path: 'edit',
    component: EditPermissionGroupComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsGroupManagementRoutingModule { }
