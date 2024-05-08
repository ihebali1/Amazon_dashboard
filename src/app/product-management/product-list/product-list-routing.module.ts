import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductOfferComponent } from './components/product-offer/product-offer.component';
import { ProductSpecificationsComponent } from './components/product-specifications/product-specifications.component';
import { ProductVariationComponent } from './components/product-variation/product-variation.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [{
  path: 'all',
  component: ProductListComponent,
},
{
  path: 'details/:id',
  component: ProductDetailsComponent,
  data: {
    toolbarShadowEnabled: true,
    containerEnabled: true
  },
  children: [
    {
      path: '',
      component: ProductInfoComponent
    },
    {
      path:'description',
      component: ProductDescriptionComponent
    },
    {
      path:'image',
      component: ProductImagesComponent
    },

    {
      path:'offer',
      component:ProductOfferComponent
    },
  
    {
      path:'variation',
      component: ProductVariationComponent
    },
    {
      path:'specification',
      component: ProductSpecificationsComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }
