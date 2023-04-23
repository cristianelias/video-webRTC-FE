import { useEffect } from "react";
import { User } from "../../types/Users";
import { socket } from "../../lib/socket";

export const useConnectedUsers = ({ setUsers }: Props) => {
  useEffect(() => {
    const onUsers = (users: User[]) => {
      console.log("users", JSON.stringify(users, null, 2));

      setUsers(users.filter((user) => user.id !== socket.id));
    };

    socket.on("users", onUsers);

    return () => {
      socket.off("users", onUsers);
    };
  }, []);

  return null;
};

type Props = {
  setUsers: (users: User[]) => void;
};
