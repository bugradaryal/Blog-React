class Post {
    constructor(id, Title, Content, Date, Image, Like = [], Comment = []) {
      this.id = id;
      this.Title = Title;
      this.Content = Content;
      this.Date = Date;
      this.Image = Image;
      this.Like = Like;
      this.Comment = Comment;
    }
  }
  
  export default Post;