import { useEffect } from "react";
import { User } from "../../types/Users";
import { socket } from "../../lib/socket";

export const useConnectedUsers = ({ setUsers }: Props) => {
  useEffect(() => {
    const onUsers = (users: User[]) => {
      setUsers(users.filter((user) => user.id !== socket.id));
    };

    socket.on("users", onUsers);

    return () => {
      socket.off("users", onUsers);
    };
  }, []);

  return;
};

type Props = {
  setUsers: (users: User[]) => void;
};
