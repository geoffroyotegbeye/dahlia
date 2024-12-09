import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'fundraisers',
        loadComponent: () => import('./pages/content/fundraisers-management/fundraisers-management.component').then(m => m.AdminFundraisersComponent)
      },
      {
        path: 'articles',
        loadComponent: () => import('./pages/content/articles-management/articles-management.component').then(m => m.AdminArticlesComponent)
      },
      {
        path: 'media',
        loadComponent: () => import('./pages/content/media-management/media-management.component').then(m => m.AdminMediaComponent)
      },
      {
        path: 'pages',
        loadComponent: () => import('./pages/content/pages-management/pages-management.component').then(m => m.AdminContentPagesComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.AdminLoginComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
