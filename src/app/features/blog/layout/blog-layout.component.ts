import { Component, inject, OnInit, Signal } from '@angular/core';
import { BlogStore } from '../../../store/blog/blog.store';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet],
    templateUrl: './blog-layout.component.html',
})
export class BlogLayoutComponent implements OnInit {
    private blogService: BlogStore = inject(BlogStore);
    isLoaded: Signal<boolean> = this.blogService.isLoaded;

    ngOnInit(): void {
        this.blogService.fetchData();
    }
}
