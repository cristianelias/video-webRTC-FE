import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../types/Users";
import { socket } from "../lib/socket";

export const PrivateConversations = () => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const onUsers = (users: User[]) => {
      console.log(users);
      setUsers(users);
    };

    socket.on("users", onUsers);

    return () => {
      socket.off("users", onUsers);
    };
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      {users?.map((user) => (
        <Box key={user.id}>{user.name}</Box>
      ))}
    </Box>
  );
};
