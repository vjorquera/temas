import { Routes } from '@angular/router';
import { ChileDashboard } from './chile-dashboard/chile-dashboard';
import { ColombiaDashboard } from './colombia-dashboard/colombia-dashboard';
import { PeruDashboard } from './peru-dashboard/peru-dashboard';

export const routes: Routes = [
  { path: 'cl', component: ChileDashboard },
  { path: 'co', component: ColombiaDashboard },
  { path: 'pe', component: PeruDashboard },
  { path: '', redirectTo: '/cl', pathMatch: 'full' } // Redirect to Chile dashboard by default
];
