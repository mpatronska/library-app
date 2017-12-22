export class CommentModel {
    constructor(
      public content: string,
      public userId: string,
      public bookId: string
    ) { }
  }