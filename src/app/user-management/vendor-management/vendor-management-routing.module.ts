import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';
import { VendorInfoComponent } from './components/vendor-info/vendor-info.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { VendorProductsComponent } from './components/vendor-products/vendor-products.component';
import { VendorStoreComponent } from './components/vendor-store/vendor-store.component';
import { VendorTransactionsComponent } from './components/vendor-transactions/vendor-transactions.component';

const routes: Routes = [
  {
    path: 'list',
    component: VendorListComponent
  },

  {
    path: 'details/:id',
    component: VendorDetailsComponent,
    data: {
      toolbarShadowEnabled: true,
      containerEnabled: true
    },
    children: [
      {
        path: '',
        component: VendorInfoComponent
      },
      {
        path: 'products',
        component: VendorProductsComponent
      },
      {
        path: 'transactions',
        component: VendorTransactionsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorManagementRoutingModule { }
