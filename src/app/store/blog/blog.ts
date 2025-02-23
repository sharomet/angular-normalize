export interface IPostModel {
  id: string;
  author: string;
  body: string;
  comments: string[];
}

export interface IAuthorModel {
  id: string;
  name: string;
}

export interface ICommentModel {
  id: string;
  author: IAuthorModel;
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
  byId: Record<string, IAuthorModel>;
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

export interface ICommentData {
  id: string;
  author: string;
  comment: string;
}

export interface IBlog {
  id: string;
  author: IAuthorModel;
  body: string;
  comments: ICommentModel[];
}
