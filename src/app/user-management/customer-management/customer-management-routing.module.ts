import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerDetailsComponent } from "./components/customer-details/customer-details.component";
import { CustomerInfoComponent } from "./components/customer-info/customer-info.component";
import { CustomerListComponent } from "./components/customer-list/customer-list.component";
import { CustomerStatisticsComponent } from "./components/customer-statistics/customer-statistics.component";
import { CustomerTransactionsComponent } from "./components/customer-transactions/customer-transactions.component";

const routes: Routes = [
  {
    path: "list",
    component: CustomerListComponent,
  },
  {
    path: "details/:id",
    component: CustomerDetailsComponent,
    data: {
      toolbarShadowEnabled: true,
      containerEnabled: true,
    },
    children: [
      {
        path: "",
        component: CustomerInfoComponent,
      },
      /*{
       path: 'statistics',
       component: CustomerStatisticsComponent
     },
     {
      path: 'transactions',
      component: CustomerTransactionsComponent
    }*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerManagementRoutingModule {}
