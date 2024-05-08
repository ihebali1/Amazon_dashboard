import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildCategoryDetailsComponent } from './components/child-category-details/child-category-details.component';
import { ChildCategoryListComponent } from './components/child-category-list/child-category-list.component';
import { ChildCategoryVariationThemeComponent } from './components/child-category-variation-theme/child-category-variation-theme.component';

const routes: Routes = [
  {
    path: 'list',
    component: ChildCategoryListComponent
  },
  {
    path: 'details/:id',
    component: ChildCategoryDetailsComponent
  },
  {
    path: 'variations/:id',
    component: ChildCategoryVariationThemeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildCategoryManagementRoutingModule { }
