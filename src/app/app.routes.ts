import { Routes } from '@angular/router';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/blog/blog.component').then((component) => component.BlogComponent)
  }
];
