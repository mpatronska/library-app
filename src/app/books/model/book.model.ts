export class BookModel {
    constructor(
      public id: string,
      public name: string,
      public author: string,
      public description: string,
      public category: string,
      public image: string
    ) { }
  }