class Post {
    constructor(id, Title, Content, Date, Image, Like = [], Comment = [], Category) {
      this.id = id;
      this.Title = Title;
      this.Content = Content;
      this.Date = Date;
      this.Image = Image;
      this.Like = Like;
      this.Comment = Comment;
      this.Category = Category;
    }
  }
  
  export default Post;