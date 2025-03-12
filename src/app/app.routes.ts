import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then((component) => component.HomeComponent)
  },
  {
    path: 'normalize',
    loadComponent: () => import('./components/normalize/normalize.component').then((component) => component.NormalizeComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog.component').then((component) => component.BlogComponent)
  },
];
