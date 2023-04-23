import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../types/Users";

export const PrivateConversations = ({
  setActiveConversationId,
  users,
}: Props) => {
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
  users?: User[];
};
