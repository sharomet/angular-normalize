import { Component, inject, Signal } from '@angular/core';
import { TPost } from '../../blog-bk/types/blog.type';
import { BlogStore } from '../../../store/blog/blog.store';
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
    private readonly blogService: BlogStore = inject(BlogStore);
    blogData: Signal<TPost[]> = this.blogService.getBlogDataComputed
}
