import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {ICommentStore, IPostStore, IAuthorStore, IPost, IAuthor, IComment} from './blog';

interface NormalizedData {
  posts: Record<string, IPostStore>;
  users: Record<string, IAuthorStore>;
  comments: Record<string, ICommentStore>;
}

@Injectable({
  providedIn: 'root'
})
export class BlogStore {
  authorsSignal: WritableSignal<IAuthorStore> = signal<IAuthorStore>({} as IAuthorStore)
  postsSignal: WritableSignal<IPostStore> = signal<IPostStore>({} as IPostStore)
  commentsSignal: WritableSignal<ICommentStore> = signal<ICommentStore>({} as ICommentStore)
  initBlogSignal: WritableSignal<boolean> = signal<boolean>(false)

  initialize(data: any[]) {
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
      const postAuthor: IAuthor = post.author;
      authors.byId[postAuthor.id] = postAuthor;
      authors.allIds.push(postAuthor.id);

      const postComments = post.comments.map((comment: IComment) => {
        const commentAuthor = comment.author;
        authors.byId[commentAuthor.id] = commentAuthor;
        authors.allIds.push(commentAuthor.id);

        comments.byId[comment.id] = {
          id: comment.id,
          author: commentAuthor.id,
          comment: comment.comment,
        };
        return comment.id;
      });

      posts.byId[post.id] = {
        id: post.id,
        author: postAuthor.id,
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

  private allPostsComputed(): Signal<IPost[]> {
    return computed(
      () => this.initBlogSignal() ? this.postsSignal().allIds.map(id => this.postsSignal().byId[id]) : []
    )
  };

  allPosts(): IPost[] {
    return this.allPostsComputed()();
  }

  private getCommentsComputed(postId: string) {
    return computed(() =>
      this.postsSignal().byId[postId].comments.map(commentId => this.commentsSignal().byId[commentId])
    );
  }

  getCommentsForPost(postId: string) {
    return this.getCommentsComputed(postId)();
  }

  private getAuthorComputed(authorId: string) {
    return computed(() => this.authorsSignal().byId[authorId]);
  }

  getAuthorById(authorId: string) {
    return this.getAuthorComputed(authorId)()
  }

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
}
