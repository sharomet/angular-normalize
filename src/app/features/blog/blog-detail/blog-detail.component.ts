import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../store/blog/blog.service';
import { TPost } from '../../blog-bk/types/blog.type';

@Component({
  selector: 'app-blog-detail',
  imports: [],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
    private readonly blogService: BlogService = inject(BlogService);
    private readonly route = inject(ActivatedRoute);
    readonly postData: Signal<any> = this.blogService.getPostComputed;

    ngOnInit(): void {
        const heroId = this.route.snapshot.paramMap.get('id') as string;
        this.blogService.selectedPostId.set(heroId)
    }

}
