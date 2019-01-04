class User {
  email = null;

  constructor(user = {}) {
    this.email = user.email;
  }
}

export default User;
