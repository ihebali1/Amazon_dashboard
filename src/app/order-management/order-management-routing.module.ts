import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderCustomerInfoComponent } from "./components/order-customer-info/order-customer-info.component";
import { OrderInfoComponent } from "./components/order-info/order-info.component";
import { OrderShippingInfoComponent } from "./components/order-shipping-info/order-shipping-info.component";
import { OrderDetailsComponent } from "./pages/order-details/order-details.component";
import { OrderListComponent } from "./pages/order-list/order-list.component";

const routes: Routes = [
  {
    path: "list",
    component: OrderListComponent,
  },
  {
    path: "details/:id",
    component: OrderDetailsComponent,
    data:{
      toolbarShadowEnabled:true,
      containerEnabled:true
    },
    children:[
      { 
        path: '',
        component: OrderInfoComponent
      },
      {

         path: 'customer',
         component: OrderCustomerInfoComponent
      },
      {
        path: 'shipping',
        component: OrderShippingInfoComponent
     },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderManagementRoutingModule {}
