import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { Box, Button, TextField, Typography } from "@mui/material";

type Message = {
  authorName: string;
  authorId: string;
  content: string;
};

export const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [name, setName] = useState<string>("");
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [outgoingMessage, setOutgoingMessage] = useState("");

  useEffect(() => {
    console.log("socket connected", socket.connected);
  }, [socket.connected]);

  useEffect(() => {
    const onSocketConnect = () => {
      setIsConnected(true);
    };

    const onSocketDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onSocketConnect);
    socket.on("disconnect", onSocketDisconnect);

    return () => {
      socket.off("connect", onSocketConnect);
      socket.off("disconnect", onSocketDisconnect);
    };
  }, []);

  useEffect(() => {
    const onMessage = (message: Message) => {
      setMessages((messages) => [...messages, message]);
    };

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, []);

  const handleSubmitName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedName(name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeOutgoingMessage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOutgoingMessage(e.target.value);
  };

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = false;

    try {
      socket.emit("message", {
        authorName: name,
        content: outgoingMessage,
        authorId: socket.id,
      });
    } catch (error) {
      error = true;
    } finally {
      if (!error) {
        setOutgoingMessage("");
      }
    }
  };

  if (!submittedName) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Please enter your name
        </Typography>
        <form onSubmit={handleSubmitName}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              sx={{ flex: 1, mr: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={name.length < 2}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    );
  }

  return (
    <section>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">👋 Welcome, {name}!</Typography>
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

        <form onSubmit={handleSubmitMessage}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Write a message
          </Typography>
          <TextField
            label="What's on your head now?"
            variant="outlined"
            value={outgoingMessage}
            onChange={handleChangeOutgoingMessage}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={outgoingMessage.length < 2}
          >
            Send
          </Button>
        </form>
      </Box>
    </section>
  );
};
