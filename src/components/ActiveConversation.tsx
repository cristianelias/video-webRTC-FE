import { Box, Typography } from "@mui/material";
import { socket } from "../lib/socket";
import { parseTimestamp } from "./utils/date";
import { getUserById } from "./utils/users";
import { User } from "../types/Users";

export const ActiveConversation = ({
  username,
  messages,
  users,
  activeConversationId,
}: Props) => {
  console.log("ActiveConversation activeConversationId", activeConversationId);

  return (
    <Box sx={{ mt: 4 }}>
      {activeConversationId === "public" ? (
        <Typography variant="h6">
          {`👋 Hey, ${username}! Welcome to the public chat, please treat everyone with respect and have fun!`}
        </Typography>
      ) : (
        <Typography variant="h6">
          {`👋 Hey, ${username}! Please treat ${
            (
              getUserById(users, activeConversationId) || {
                name: "this person",
              }
            ).name
          } with respect and have fun!`}
        </Typography>
      )}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Messages
      </Typography>
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        {messages.length > 0 ? (
          messages.map((message: Message, index) => (
            <Box sx={{ mb: 2 }} key={message.authorId + index}>
              {message.authorId === socket.id ? (
                <Typography variant="body1">You said:</Typography>
              ) : (
                <Typography variant="body1">{`From: ${message.authorName}`}</Typography>
              )}
              <Typography variant="h6">{message.content}</Typography>
              <Box>Sent at: {parseTimestamp(message.timestamp)}hs</Box>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              height: "100%",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              😪 No messages yet
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

type Props = {
  username: string;
  messages: Message[];
  users: User[];
  activeConversationId: string;
};
