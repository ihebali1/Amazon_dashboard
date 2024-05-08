import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GainRoutingModule } from './gain/gain-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gain'
  },
  {
    path: 'gain',
    children: [
      {
        path: '',
        loadChildren: () => import('./gain/gain.module').then(m => m.GainModule),
        data: {
          toolbarShadowEnabled: true
        }
      },
    ]
  },
  {
    path: 'payment-platform',
    children: [
      {
        path: '',
        loadChildren: () => import('./payment-platform/payment-platform.module').then(m => m.PaymentPlatformModule),
        data: {
          toolbarShadowEnabled: true
        }
      },
    ]
  },
  {
    path: 'subscription',
    children: [
      {
        path: '',
        loadChildren: () => import('./subscription/subscription.module').then(m => m.SubscriptionModule),
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
export class SettingsRoutingModule { }
