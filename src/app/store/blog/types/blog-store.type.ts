import { TAuthorBase, TCommentBase, TPostBase } from '../../../features/blog/types/blog.type';

export type TPostBaseStore = TPostBase & {
    author: string;
    comments: string[];
}

export type TAuthorBaseStore = TAuthorBase & {}

export type TCommentBaseStore = TCommentBase & {
    author: string;
}

export type TPostStore = {
    byId: Record<string, TPostBaseStore>;
    allIds: string[];
}

export type TCommentStore = {
    byId: Record<string, TCommentBaseStore>;
    allIds: string[];
}

export type TAuthorStore = {
    byId: Record<string, TAuthorBaseStore>;
    allIds: string[];
}

export type TBlogStore = {
    posts: TPostStore,
    comments: TCommentStore,
    authors: TAuthorStore,
}
