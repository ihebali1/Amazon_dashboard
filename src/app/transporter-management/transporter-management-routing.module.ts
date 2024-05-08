import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./component/list/list.component";
import {AddComponent} from "./component/add/add.component";
import {EditComponent} from "./component/edit/edit.component";

const routes: Routes = [

  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent
    ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransporterManagementRoutingModule { }
