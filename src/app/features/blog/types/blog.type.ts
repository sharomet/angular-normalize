export type TAuthorBase = {
    id: string;
    name: string;
}
export type TAuthor = TAuthorBase & {}

export type TCommentBase = {
    id: string;
    comment: string;
}
export type TComment = TCommentBase & {
    author: TAuthor;
}

export type TPostBase = {
    id: string;
    title: string;
    body: string;
}
export type TPost = TPostBase & {
    author: TAuthor;
    comments: TComment[];
}
