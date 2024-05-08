import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer'
  },
  {
    path: 'customer',
    children: [
      {
        path: '',
        loadChildren: () => import('./customer-management/customer-management.module').then(m => m.CustomerManagementModule),
        data: {
          toolbarShadowEnabled: true
        }
      },
    ]
  },
  {
    path: 'vendor',
    children: [
      {
        path: '',
        loadChildren: () => import('./vendor-management/vendor-management.module').then(m => m.VendorManagementModule),
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
export class UserManagementRoutingModule { }
