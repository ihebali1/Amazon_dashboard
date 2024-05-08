import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    children: [
      {
        path: '',
        loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule),
        data: {
          toolbarShadowEnabled: true
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
