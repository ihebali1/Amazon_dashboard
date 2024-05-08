import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { AuthGuard } from './shared/guards/auth.guard';

import {TransporterManagementModule} from './transporter-management/transporter-management.module';
import {SettingComponent} from "./setting-management/components/setting/setting.component";

const routes: VexRoutes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/pages/auth/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: 'coming-soon',
    loadChildren: () => import('./pages/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule),
  },
  {
    path: '',
    component: CustomLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboards/analytics',
        redirectTo: '/'
      },
      {
        path: '',
        loadChildren: () => import('./pages/dashboards/dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule),
      },
      {
        path: 'content-management',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
            data: {
            
            },
        children: [
          {
            path: '',
            loadChildren: () => import('./content-management/content-management.module').then(m => m.ContentManagementModule),
            data: {
              toolbarShadowEnabled: true
            },
          },
        ]
      },
      {
        path: 'user-management',
        children: [
          {
            path: '',
            loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
        ]
      },
      {
        path: 'platform-gain',
        children: [
          {
            path: '',
            loadChildren: () => import('./platform-gain/platform-gain.module').then(m => m.PlatformGainModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
        ]
      },
      {
        path: 'advertising-management',
        children: [
          {
            path: '',
            loadChildren: () => import('./advertising/advertising.module').then(m => m.AdvertisingModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
        ]
      },
      {
        path: 'order-management',
        children: [
          {
            path: '',
            loadChildren: () => import('./order-management/order-management.module').then(m => m.OrderManagementModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
        ]
      },
      {
        path: 'brand-management',
        children: [
          {
            path: '',
            loadChildren: () => import('./brand-management/brand-management.module').then(m => m.BrandManagementModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
        ]
      },
      {
        path: 'admin-management',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
            data: {
              role: 'SUPER_ADMIN'
            },
        children: [
          {
            path: '',
            loadChildren: () => import('./admin-management/admin-management.module').then(m => m.AdminManagementModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
        ]
      },
      {
        path: 'permissions-group-management',
        children: [
          {
            path: '',
            // tslint:disable-next-line:max-line-length
            loadChildren: () => import('./permissions-group-management/permissions-group-management.module').then(m => m.PermissionsGroupManagementModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
        ]
      },
      {
        path: 'transporter-management',
        children: [
          {
            path: '',
            loadChildren: () => import('./transporter-management/transporter-management.module').then(m => TransporterManagementModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
        ]
      },
      {
        path: 'setting-management',
        children: [
          {
            path: '',
            loadChildren: () => import('./setting-management/setting-management.module').then(m => m.SettingManagementModule),
          }
        ]
      },
      {
        path: 'report-management',
        children: [
          {
            path: '',
            loadChildren: () => import('./reports-management/reports-management.module').then(m => m.ReportsManagementModule),
          }
        ]
      }
      ,
      {
        path: 'payout-management',
        children: [
          {
            path: '',
            loadChildren: () => import('./payout-management/payout-management.module').then(m => m.PayoutManagementModule),
          }
        ]
      },
      {
        path: 'product-management',
        children: [
          {
            path: '',
            loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule),
          }
        ]},
        {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'payment-platform',
            loadChildren: () => import('./settings/settings-routing.module').then(m => m.SettingsRoutingModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'subscription',
            loadChildren: () => import('./settings/settings-routing.module').then(m => m.SettingsRoutingModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
        ]
      },
      {
        path: 'apps',
        children: [
          {
            path: 'chat',
            loadChildren: () => import('./pages/apps/chat/chat.module').then(m => m.ChatModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'mail',
            loadChildren: () => import('./pages/apps/mail/mail.module').then(m => m.MailModule),
            data: {
              toolbarShadowEnabled: true,
              scrollDisabled: true
            }
          },
          {
            path: 'social',
            loadChildren: () => import('./pages/apps/social/social.module').then(m => m.SocialModule)
          },
          {
            path: 'contacts',
            loadChildren: () => import('./pages/apps/contacts/contacts.module').then(m => m.ContactsModule)
          },
          {
            path: 'calendar',
            loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'aio-table',
            loadChildren: () => import('./pages/apps/aio-table/aio-table.module').then(m => m.AioTableModule),
          },
          {
            path: 'help-center',
            loadChildren: () => import('./pages/apps/help-center/help-center.module').then(m => m.HelpCenterModule),
          },
          {
            path: 'scrumboard',
            loadChildren: () => import('./pages/apps/scrumboard/scrumboard.module').then(m => m.ScrumboardModule),
          },
          {
            path: 'editor',
            loadChildren: () => import('./pages/apps/editor/editor.module').then(m => m.EditorModule),
          },
        ]
      },
      {
        path: 'pages',
        children: [
          {
            path: 'pricing',
            loadChildren: () => import('./pages/pages/pricing/pricing.module').then(m => m.PricingModule)
          },
          {
            path: 'faq',
            loadChildren: () => import('./pages/pages/faq/faq.module').then(m => m.FaqModule)
          },
          {
            path: 'guides',
            loadChildren: () => import('./pages/pages/guides/guides.module').then(m => m.GuidesModule)
          },
          {
            path: 'invoice',
            loadChildren: () => import('./pages/pages/invoice/invoice.module').then(m => m.InvoiceModule)
          },
          {
            path: 'error-404',
            loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
          },
          {
            path: 'error-500',
            loadChildren: () => import('./pages/pages/errors/error-500/error-500.module').then(m => m.Error500Module)
          }
        ]
      },
      {
        path: 'ui',
        children: [
          {
            path: 'components',
            loadChildren: () => import('./pages/ui/components/components.module').then(m => m.ComponentsModule),
          },
          {
            path: 'forms/form-elements',
            loadChildren: () => import('./pages/ui/forms/form-elements/form-elements.module').then(m => m.FormElementsModule),
            data: {
              containerEnabled: true
            }
          },
          {
            path: 'forms/form-wizard',
            loadChildren: () => import('./pages/ui/forms/form-wizard/form-wizard.module').then(m => m.FormWizardModule),
            data: {
              containerEnabled: true
            }
          },
          {
            path: 'icons',
            loadChildren: () => import('./pages/ui/icons/icons.module').then(m => m.IconsModule)
          },
          {
            path: 'page-layouts',
            loadChildren: () => import('./pages/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule),
          },
        ]
      },
      {
        path: 'documentation',
        loadChildren: () => import('./pages/documentation/documentation.module').then(m => m.DocumentationModule),
      },
      {
        path: '**',
        loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule {
}
