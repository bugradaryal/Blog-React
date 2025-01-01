class User {
    constructor(Id, UserName, Email, Name, SurName, PhoneNumber, Address = []) {
      this.Id = Id;
      this.UserName = UserName;
      this.Email = Email;
      this.Name = Name;
      this.SurName = SurName;
      this.PhoneNumber = PhoneNumber;
      this.Address = Address;
     }
  }
  
  export default User;