import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeDetailsComponent } from './components/attribute-details/attribute-details.component';
import { AttributeListComponent } from './components/attribute-list/attribute-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AttributeListComponent
  },
  {
    path: 'details/:id',
    component: AttributeDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeManagementRoutingModule { }
