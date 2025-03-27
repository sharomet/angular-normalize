const users = require('./users');
const comments = require('./comments');

module.exports = [
    {
        id: "0F94E346-01D0-46CD-8A42-37BE4F865394",
        author: users[0],
        title: "Post Title 1",
        body: "Post 1 content",
        comments: [comments[0], comments[1]]
    },
    {
        id: "1F94E346-01D0-46CD-8A42-37BE4F865394",
        author: users[1],
        title: "Post Title 2",
        body: "Post 2 content",
        comments: [comments[2], comments[3], comments[4]]
    },
    {
        id: "2F94E346-01D0-46CD-8A42-37BE4F865394",
        author: users[1],
        title: "Post Title 3",
        body: "Post 3 content",
        comments: [comments[5], comments[6], comments[7]]
    }
];
