import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home.component').then((component) => component.HomeComponent)
    },
    {
        path: 'blog',
        loadChildren: () => import('./features/blog/blog.routes')
            .then((routes) => routes.BLOG_ROUTES)
    },
    {
        path: 'normalize',
        loadComponent: () => import('./components/normalize/normalize.component').then((component) => component.NormalizeComponent)
    },
];
