import { Routes } from '@angular/router';
import { BlogLayoutComponent } from './layout/blog-layout.component';

export const BLOG_ROUTES: Routes = [
    {
        path: '',
        component: BlogLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./components/blog/blog.component')
                    .then((component) => component.BlogComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./components/blog-detail/blog-detail.component')
                    .then((component) => component.BlogDetailComponent)
            }
        ]
    },
];
