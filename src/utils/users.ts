import { User } from "../types/Users";

export const getUserById = (users: User[], id: string) =>
  users.find((user) => user.id === id);

export const getUsernameById = (users: User[], id: string) => {
  const user = getUserById(users, id);
  return user ? user.name : "";
};
