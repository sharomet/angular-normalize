import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TAuthor, TComment, TPost } from '../../features/blog/types/blog.type';
import { HttpClient } from '@angular/common/http';
import { TAuthorStore, TCommentStore, TPostStore } from './types/blog-store.type';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    authorsSignal: WritableSignal<TAuthorStore> = signal<TAuthorStore>({} as TAuthorStore)
    postsSignal: WritableSignal<TPostStore> = signal<TPostStore>({} as TPostStore)
    commentsSignal: WritableSignal<TCommentStore> = signal<TCommentStore>({} as TCommentStore)
    initBlogSignal: WritableSignal<boolean> = signal<boolean>(false)

    fetchData() {
        this.httpClient.get<TPost[]>('http://localhost:3000/blog')
            .subscribe((data: TPost[]) => this.normalization(data))
    }

    private addNewElement(currentElement: { byId: Record<string, any>, allIds: string[] }, newElement: { id: string }) {
        if (!currentElement.allIds.includes(newElement.id)) {
            currentElement.byId[newElement.id] = newElement;
            currentElement.allIds.push(newElement.id);
        }
    }

    normalization(data: TPost[]) {
        const authors: TAuthorStore = {
            byId: {},
            allIds: [],
        };
        const posts: TPostStore = {
            byId: {},
            allIds: [],
        };
        const comments: TCommentStore = {
            byId: {},
            allIds: [],
        };

        data.forEach((post: TPost) => {
            const postAuthor: TAuthor = post.author;

            this.addNewElement(authors, postAuthor);

            const postComments = post.comments.map((comment: TComment) => {
                const commentAuthor = comment.author;
                this.addNewElement(authors, commentAuthor);

                comments.byId[comment.id] = {
                    id: comment.id,
                    author: commentAuthor.id,
                    comment: comment.comment,
                };
                comments.allIds.push(comment.id);
                return comment.id;
            });

            posts.byId[post.id] = {
                id: post.id,
                author: postAuthor.id,
                title: post.title,
                body: post.body,
                comments: postComments,
            };
            posts.allIds.push(post.id);
        });

        this.authorsSignal.set(authors)
        this.postsSignal.set(posts)
        this.commentsSignal.set(comments)
        this.initBlogSignal.set(true);
    }
}
