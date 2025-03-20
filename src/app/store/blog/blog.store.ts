import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TAuthor, TComment, TPost } from '../../features/blog-bk/types/blog.type';
import { TAuthorStore, TCommentStore, TPostStore } from './types/blog-store.type';
import { BlogService } from '../../features/blog/serveices/blog.service';

@Injectable({
    providedIn: 'root'
})
export class BlogStore {
    private readonly blogService: BlogService = inject(BlogService);
    authorsSignal: WritableSignal<TAuthorStore> = signal<TAuthorStore>({} as TAuthorStore)
    postsSignal: WritableSignal<TPostStore> = signal<TPostStore>({} as TPostStore)
    commentsSignal: WritableSignal<TCommentStore> = signal<TCommentStore>({} as TCommentStore)
    selectedPostId: WritableSignal<string> = signal<string>('');
    private initBlogSignal: WritableSignal<boolean> = signal<boolean>(false)

    fetchData() {
        this.blogService.fetchBlogData()
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

    isLoaded: Signal<boolean> = computed(() => this.initBlogSignal())

    getBlogDataComputed: Signal<TPost[]> = computed(() => {
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

    getPostComputed: Signal<TPost| null> = computed(() => {
        const post = this.postsSignal().byId[this.selectedPostId()];
        if (!post) {
            return null;
        }
        return {
            ...post,
            author: this.authorsSignal().byId[post.author],
            comments: post.comments.map((commentId) => {
                const comment = this.commentsSignal().byId[commentId];
                return comment ? {
                    ...comment,
                    author: this.authorsSignal().byId[comment.author] || null,
                } : {} as TComment;
            })
        }
    });
}
