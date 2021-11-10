export class Account {
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public likedRecipes: string[];

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    likedRecipes: string[]
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.likedRecipes = likedRecipes;
  }
}
