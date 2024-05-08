import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariationThemeDetailsComponent } from './components/variation-theme-details/variation-theme-details.component';
import { VariationThemeListComponent } from './components/variation-theme-list/variation-theme-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: VariationThemeListComponent
  },
  {
    path: 'details/:id',
    component: VariationThemeDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariationThemeManagementRoutingModule { }
