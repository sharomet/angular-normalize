import { Component, inject, Signal } from '@angular/core';
import { TPost } from '../../blog-bk/types/blog.type';
import { BlogService } from '../../../store/blog/blog.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blog',
    imports: [
        RouterLink
    ],
    templateUrl: './blog.component.html',
    styleUrl: 'blog.component.scss'
})
export class BlogComponent {
    private readonly blogService: BlogService = inject(BlogService);
    blogData: Signal<TPost[]> = this.blogService.getBlogDataComputed
}
