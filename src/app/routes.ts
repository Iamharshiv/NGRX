import { Route } from '@angular/router';
import { GlobalFeedComponent } from './features/globalFeed/components/global-feed/global-feed.component';

export const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/globalFeed/globalFeed.routes').then(
            (m) => m.globalFeedRoutes
          ),
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
