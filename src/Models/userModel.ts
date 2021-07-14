export default user;

type ThisUserTypes = {
  name: string;
  id: string;
  password: string;
  role: string;
};

type UserTypes = {
  name: string;
  _id: string;
  password: string;
  role: string;
};

function user(this: ThisUserTypes, user: UserTypes) {
  if (user !== undefined) {
    this.id = user._id;
    this.name = user.name;
    this.password = user.password;
    this.role = user.role;
  }
}

// const userModel = class UserTypes {
//   name: string;
//   id: string;
//   password: string;
//   role: string;

//   constructor(user: UserTypes) {
//     this.id = user._id;
//     this.name = user.name;
//     this.password = user.password;
//     this.role = user.role;
//   }
// };

// export default userModel;
