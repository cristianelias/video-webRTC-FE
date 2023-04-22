import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../types/Users";
import { socket } from "../../lib/socket";
import { useConnectedUsers } from "./useConnectedUsers";

export const PrivateConversations = ({ setActiveConversationId }: Props) => {
  const [users, setUsers] = useState<User[]>();
  useConnectedUsers({ setUsers });

  const enterPrivateConversation = (id: string) => {
    setActiveConversationId(id);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {users?.map((user) => (
        <Box key={user.id} onClick={() => enterPrivateConversation(user.id)}>
          {user.name}
        </Box>
      ))}
    </Box>
  );
};

type Props = {
  setActiveConversationId: (conversationId: string) => void;
};
