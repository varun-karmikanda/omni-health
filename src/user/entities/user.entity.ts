export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  staus: 'active' | 'inactive';
  createdAt: Date;
}

export class User implements IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  staus: 'active' | 'inactive';
  createdAt: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.staus = user.staus;
    this.createdAt = user.createdAt;
  }
}

export const usersDB: Array<User> = [
  new User({
    id: 1,
    name: "Varun",
    email: "varun@gmail.com",
    password: "password",
    staus: "active",
    createdAt: new Date()
  }),
  new User({
    id: 2,
    name: "Arun",
    email: "arun@gmail.com",
    password: "password",
    staus: "active",
    createdAt: new Date()
  }),
  new User({
    id: 3,
    name: "Kumar",
    email: "kumar@gmail.com",
    password: "password",
    staus: "inactive",
    createdAt: new Date()
  })
];
