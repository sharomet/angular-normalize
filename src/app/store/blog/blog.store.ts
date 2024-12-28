import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
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
  authors: WritableSignal<IAuthorStore> = signal<IAuthorStore>({} as IAuthorStore)
  posts: WritableSignal<IPostStore> = signal<IPostStore>({} as IPostStore)
  comments: WritableSignal<ICommentStore> = signal<ICommentStore>({} as ICommentStore)

  public readonly $getPosts = this.posts.asReadonly();
  public readonly $getComments = this.comments.asReadonly();
  public readonly $getAuthors = this.authors.asReadonly();

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

    this.authors.set(authors)
    this.posts.set(posts)
    this.comments.set(comments)
  }

  /*getCommentsByPost(postId: string): Signal<ICommentStore[]> {
    const post = this.$getPosts()[postId];
    if (!post) {
      return signal([])
    }
    return signal(post.comments.map(commentId => this.$getComments()[commentId]));
  }*/
}
