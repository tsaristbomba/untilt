export default user;

function user(user) {
  if (user !== undefined) {
    this.id = user._id;
    this.name = user.name;
    this.password = user.password;
    this.role = user.role;
  }
}
