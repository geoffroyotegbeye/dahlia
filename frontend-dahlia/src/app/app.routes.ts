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
import { AdminLoginComponent } from './admin/pages/login/login.component';
import { AdminUsersComponent } from './admin/pages/users/users.component';
import { AdminContentPagesComponent } from './admin/pages/content/pages-management/pages-management.component';
import { AdminArticlesComponent } from './admin/pages/content/articles-management/articles-management.component';
import { AdminFundraisersComponent } from './admin/pages/content/fundraisers-management/fundraisers-management.component';
import { AdminMediaComponent } from './admin/pages/content/media-management/media-management.component';
import { AdminSettingsComponent } from './admin/pages/settings/settings.component';
import { AdminAnalyticsComponent } from './admin/pages/analytics/analytics.component';
import { AuthGuard } from './admin/guards/auth.guard';
import { RoleGuard } from './admin/guards/role.guard';

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
  // Admin Routes
  { 
    path: 'admin', 
    children: [
      { path: 'login', component: AdminLoginComponent },
      { 
        path: 'dashboard', 
        component: AdminDashboardComponent, 
        canActivate: [AuthGuard, RoleGuard] 
      },
      { 
        path: 'users', 
        component: AdminUsersComponent, 
        canActivate: [AuthGuard, RoleGuard] 
      },
      { 
        path: 'content', 
        children: [
          { path: 'pages', component: AdminContentPagesComponent, canActivate: [AuthGuard, RoleGuard] },
          { path: 'articles', component: AdminArticlesComponent, canActivate: [AuthGuard, RoleGuard] },
          { path: 'fundraisers', component: AdminFundraisersComponent, canActivate: [AuthGuard, RoleGuard] },
          { path: 'media', component: AdminMediaComponent, canActivate: [AuthGuard, RoleGuard] }
        ]
      },
      { 
        path: 'settings', 
        component: AdminSettingsComponent, 
        canActivate: [AuthGuard, RoleGuard] 
      },
      { 
        path: 'analytics', 
        component: AdminAnalyticsComponent, 
        canActivate: [AuthGuard, RoleGuard] 
      }
    ]
  }
];
