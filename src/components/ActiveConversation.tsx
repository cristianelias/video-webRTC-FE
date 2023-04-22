import { Box, Typography } from "@mui/material";
import { socket } from "../lib/socket";

export const ActiveConversation = ({ username, messages }: Props) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">👋 Welcome, {username}!</Typography>
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
              <Typography variant="body2">{message.content}</Typography>
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
};
