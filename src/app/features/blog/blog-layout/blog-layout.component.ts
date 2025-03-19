import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../../store/blog/blog.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet],
    templateUrl: './blog-layout.component.html',
})
export class BlogLayoutComponent implements OnInit {
    private blogService: BlogService = inject(BlogService);

    ngOnInit(): void {
        this.blogService.fetchData();
    }
}
