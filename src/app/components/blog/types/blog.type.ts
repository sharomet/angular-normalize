export type TAuthorBase = {
    id: string;
    name: string;
}

export type TAuthor = TAuthorBase & {}

export type TCommentBase = {
    id: string;
    author: TAuthor;
    comment: string;
}

export type TComment = TCommentBase & {}

export type TBlogBase = {
    id: string;
    author: TAuthor;
    title: string;
    body: string;
    comments: TComment[];
}

export type IBlog = TBlogBase & {}
