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
  }

  allPosts() {
    return computed(() =>
      this.postsSignal().allIds.map(id => this.postsSignal().byId[id])
    )
  };

  getCommentsForPost(postId: string) {
    return computed(() =>
      this.postsSignal().byId[postId].comments.map(commentId => this.commentsSignal().byId[commentId])
    );
  }

  getAuthorById(authorId: string) {
    computed(() => this.authorsSignal().byId[authorId]);
  }
}
