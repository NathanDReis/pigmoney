export interface UserInterface {
    password: string;
    userName: string;
    fullName: string;
    telephone: string;
    email: string;
    perfilId?: string;
}

export interface UserInterfaceResponse extends Omit<UserInterface, "password"> {
  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}