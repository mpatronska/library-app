export class CommentModel {
    constructor(
      public content: string,
      public userId: string,
      public username: string,
      public bookId: string
    ) { }
  }