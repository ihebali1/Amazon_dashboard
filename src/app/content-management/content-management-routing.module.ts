import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'department'
  },
  {
    path: 'department',
    children: [
      {
        path: '',
        loadChildren: () => import('./department-management/department-management.module').then(m => m.DepartmentManagementModule),
        data: {
          toolbarShadowEnabled: true
        }
      },
    ]
  },
  {
    path: 'parent-category',
    children: [
      {
        path: '',
        loadChildren: () => import('./parent-category-management/parent-category-management.module').then(m => m.ParentCategoryManagementModule),
        data: {
          toolbarShadowEnabled: true
        }
      },
    ]
  },
  {
    path: 'child-category',
    children: [
      {
        path: '',
        loadChildren: () => import('./child-category-management/child-category-management.module').then(m => m.ChildCategoryManagementModule),
        data: {
          toolbarShadowEnabled: true
        }
      },
    ]
  },
  {
    path: 'attribute',
    children: [
      {
        path: '',
        loadChildren: () => import('./attribute-management/attribute-management.module').then(m => m.AttributeManagementModule),
        data: {
          toolbarShadowEnabled: true
        }
      },
    ]
  },
  {
    path: 'variation-theme',
    children: [
      {
        path: '',
        loadChildren: () => import('./variation-theme-management/variation-theme-management.module').then(m => m.VariationThemeManagementModule),
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
export class ContentManagementRoutingModule { }
