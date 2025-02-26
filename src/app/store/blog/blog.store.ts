import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import {
    ICommentStore,
    IPostStore,
    IAuthorStore,
    IAuthorModel,
    ICommentModel,
    IBlog
} from './blog';
import { HttpClient } from '@angular/common/http';
import { GUID } from '../../common/helpers/guid.helper';
import { produce } from "immer"

@Injectable({
    providedIn: 'root'
})
export class BlogStore {
    private httpClient: HttpClient = inject(HttpClient);
    authorsSignal: WritableSignal<IAuthorStore> = signal<IAuthorStore>({} as IAuthorStore)
    postsSignal: WritableSignal<IPostStore> = signal<IPostStore>({} as IPostStore)
    commentsSignal: WritableSignal<ICommentStore> = signal<ICommentStore>({} as ICommentStore)
    initBlogSignal: WritableSignal<boolean> = signal<boolean>(false)

    fetchData() {
        this.httpClient.get<IBlog[]>('http://localhost:3000/blog')
            .subscribe((data) => this.initialize(data))
    }

    initialize(data: IBlog[]) {
        const authors: IAuthorStore = {
            byId: {},
            allIds: [],
        };
        const posts: IPostStore = {
            byId: {},
            allIds: [],
        };
        const comments: ICommentStore = {
            byId: {},
            allIds: [],
        };

        data.forEach((post: any) => {
            const postAuthor: IAuthorModel = post.author;
            authors.byId[postAuthor.id] = postAuthor;
            authors.allIds.push(postAuthor.id);

            const postComments = post.comments.map((comment: ICommentModel) => {
                const commentAuthor = comment.author;
                authors.byId[commentAuthor.id] = commentAuthor;
                authors.allIds.push(commentAuthor.id);

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

        console.log('authors', authors)
        console.log('posts', posts)
        console.log('comments', comments)
        this.authorsSignal.set(authors)
        this.postsSignal.set(posts)
        this.commentsSignal.set(comments)
        this.initBlogSignal.set(true);
    }

    getDenormalizeDataComputed: Signal<IBlog[]> = computed(() => {
        if (!this.initBlogSignal()) {
            return [];
        }
        return this.postsSignal().allIds.map(postId => {
            const post = this.postsSignal().byId[postId];
            const author = this.authorsSignal().byId[post.author];
            const comments = post.comments.map(commentId => ({
                ...this.commentsSignal().byId[commentId],
                author: this.authorsSignal().byId[this.commentsSignal().byId[commentId].author]
            }));
            return {...post, author, comments};
        });
    })

    updatePost(id: string, body: string) {
        const currentPosts = this.postsSignal();
        if (currentPosts.byId[id]) {
            this.postsSignal.update((value) => ({
                ...value,
                byId: {
                    ...value.byId,
                    [id]: {...value.byId[id], body: body}
                }
            }));
        }
    }

    updateComment(id: string, comment: string) {
        this.commentsSignal.update((value) => ({
            ...value,
            byId: {
                ...value.byId,
                [id]: {
                    ...value.byId[id],
                    comment: comment,
                }
            }
        }))
    }

    addComment(authorId: string, postId: string, comment: string) {
        const commentId: string = GUID();
        this.commentsSignal.update((value: ICommentStore) => produce(value, draftState => {
            draftState.byId[commentId] = {
                author: authorId,
                comment: comment,
                id: commentId
            }
            draftState.allIds.push(commentId);
        }));
        this.postsSignal.update((value: IPostStore) => produce(value, draftState => {
            draftState.byId[postId].comments.push(commentId);
        }))
    }

    updateAuthor(id: string, name: string) {
        const currentAuthors = this.authorsSignal();
        if (currentAuthors.byId[id]) {
            this.authorsSignal.update((value) => ({
                ...value,
                byId: {
                    ...value.byId,
                    [id]: {...value.byId[id], name: name}
                }
            }));
        }
    }
}
