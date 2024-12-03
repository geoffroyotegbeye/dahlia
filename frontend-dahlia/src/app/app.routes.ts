import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './about/about.component';
import { FundraisingComponent } from './fundraising/fundraising.component';
import { EventsComponent } from './events/events.component';
import { BlogComponent } from './blog/blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'fundraising', component: FundraisingComponent },
  { path: 'events', component: EventsComponent },
  { path: 'blog', component: BlogComponent },
];
