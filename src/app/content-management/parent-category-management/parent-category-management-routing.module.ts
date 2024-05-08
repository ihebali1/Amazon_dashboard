import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentCategoryDetailsComponent } from './components/parent-category-details/parent-category-details.component';
import { ParentCategoryListComponent } from './components/parent-category-list/parent-category-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ParentCategoryListComponent
  },
  {
    path: 'details/:id',
    component: ParentCategoryDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentCategoryManagementRoutingModule { }
