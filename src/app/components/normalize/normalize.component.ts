import {Component, inject, OnInit, signal, Signal} from '@angular/core';
import {BlogStore} from '../../store/blog/blog.store';
import {IBlog} from '../../store/blog/blog';

@Component({
    selector: 'app-normalize',
    imports: [],
    templateUrl: './normalize.component.html',
})
export class NormalizeComponent implements OnInit {
    private blogStore: BlogStore = inject(BlogStore);
    blogData: Signal<IBlog[]> = this.blogStore.getDenormalizeDataComputed;
    authorData = this.blogStore.getAuthorsComputed;

    ngOnInit(): void {
        this.blogStore.fetchData();
        setTimeout(() => {
            this.updateComment();
        }, 2000);
    }

    updateComment() {
        this.blogStore.updateComment(
            '1F94E346-01D0-46CD-8A42-37BE4F865393',
            'Hello World!'
        );
    }

    addComment(authorId: string, postId: string): void {
        this.blogStore.addComment(authorId, postId, 'New Comment');
    }
}
