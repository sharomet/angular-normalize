import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogStore } from '../../../../store/blog/blog.store';
import { TPost } from '../../types/blog.type';

@Component({
    selector: 'app-blog-detail',
    imports: [],
    templateUrl: './blog-detail.component.html',
    styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
    private readonly blogService: BlogStore = inject(BlogStore);
    private readonly route = inject(ActivatedRoute);
    readonly selectedPost: Signal<TPost | null> = this.blogService.getSelectedPost;

    ngOnInit(): void {
        const postID = this.route.snapshot.paramMap.get('id') as string;
        this.blogService.setSelectedPost(postID);
    }

}
