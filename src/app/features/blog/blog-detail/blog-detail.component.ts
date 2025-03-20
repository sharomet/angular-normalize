import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogStore } from '../../../store/blog/blog.store';
import { TPost } from '../../blog-bk/types/blog.type';

@Component({
    selector: 'app-blog-detail',
    imports: [],
    templateUrl: './blog-detail.component.html',
    styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
    private readonly blogService: BlogStore = inject(BlogStore);
    private readonly route = inject(ActivatedRoute);
    readonly postData: Signal<TPost | null> = this.blogService.getPostComputed;

    ngOnInit(): void {
        const postID = this.route.snapshot.paramMap.get('id') as string;
        this.blogService.selectedPostId.set(postID)
    }

}
