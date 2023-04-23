import { User } from "../../types/Users";

export const getUserById = (users: User[], id: string) =>
  users.find((user) => user.id === id);
