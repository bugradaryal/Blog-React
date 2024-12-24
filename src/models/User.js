class User {
    constructor(id, name, email, posts = []) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.posts = posts;  // Bir kullanıcıya ait posts dizisi
    }
  
    addPost(post) {
      this.posts.push(post); // Yeni bir post eklemek için bir metod
    }
  }
  
  export default User;