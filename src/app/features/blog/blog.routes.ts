import { Routes } from '@angular/router';
import { BlogLayoutComponent } from './blog-layout/blog-layout.component';

export const BLOG_ROUTES: Routes = [
    {
        path: '',
        component: BlogLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./blog/blog.component')
                    .then((component) => component.BlogComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./blog-detail/blog-detail.component')
                    .then((component) => component.BlogDetailComponent)
            }
        ]
    },
];
