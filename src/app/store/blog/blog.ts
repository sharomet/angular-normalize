export interface IPost {
  id: string;
  author: string;
  body: string;
  comments: string[];
}

export interface IAuthor {
  id: string;
  name: string;
}

export interface IComment {
  id: string;
  author: IAuthor;
  comment: string;
}

export interface IPostStore {
  byId: Record<string, {
    id: string;
    author: string;
    body: string;
    comments: string[];
  }>;
  allIds: string[];
}

export interface IAuthorStore {
  byId: Record<string, IAuthor>;
  allIds: string[];
}

export interface ICommentStore {
  byId: Record<string, {
    id: string;
    author: string;
    comment: string;
  }>;
  allIds: string[];
}

export interface IBlogStore {
  posts: IPostStore,
  comments: ICommentStore,
  authors: IAuthorStore,
}
