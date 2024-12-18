import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FundraisingComponent } from './pages/fundraising/fundraising.component';
import { EventsComponent } from './pages/events/events.component';
import { ActualityComponent } from './pages/actuality/actuality.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AdminDashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { AdminUsersComponent } from './admin/pages/users/users.component';
import { AdminContentPagesComponent } from './admin/pages/content/pages-management/pages-management.component';
import { AdminArticlesComponent } from './admin/pages/content/articles-management/articles-management.component';
import { AdminFundraisersComponent } from './admin/pages/content/fundraisers-management/fundraisers-management.component';
import { AdminMediaComponent } from './admin/pages/content/media-management/media-management.component';
import { AdminSettingsComponent } from './admin/pages/settings/settings.component';
import { AdminAnalyticsComponent } from './admin/pages/analytics/analytics.component';
import { AuthGuard } from './admin/guards/auth.guard';
import { RoleGuard } from './admin/guards/role.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'fundraising', component: FundraisingComponent },
  { path: 'events', component: EventsComponent },
  { path: 'news', component: ActualityComponent },
  { path: 'blog', component: ActualityComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  // Admin Routes
  { 
    path: 'admin', 
    loadComponent: () => import('./admin/layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'dashboard', 
        component: AdminDashboardComponent, 
        canActivate: [RoleGuard] 
      },
      { 
        path: 'users', 
        component: AdminUsersComponent, 
        canActivate: [RoleGuard] 
      },
      { 
        path: 'content', 
        children: [
          { path: 'pages', component: AdminContentPagesComponent, canActivate: [RoleGuard] },
          { path: 'articles', component: AdminArticlesComponent, canActivate: [RoleGuard] },
          { path: 'fundraisers', component: AdminFundraisersComponent, canActivate: [RoleGuard] },
          { path: 'media', component: AdminMediaComponent, canActivate: [RoleGuard] }
        ]
      },
      { 
        path: 'settings', 
        component: AdminSettingsComponent, 
        canActivate: [RoleGuard] 
      },
      { 
        path: 'analytics', 
        component: AdminAnalyticsComponent, 
        canActivate: [RoleGuard] 
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
