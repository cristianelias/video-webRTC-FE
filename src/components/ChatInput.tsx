import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { socket } from "../lib/socket";

export const ChatInput = ({ username }: Props) => {
  const [draft, setDraft] = useState("");

  const changeDraft = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
  };

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = false;

    try {
      socket.emit("message", {
        authorName: username,
        content: draft,
        authorId: socket.id,
      });
    } catch (error) {
      error = true;
    } finally {
      if (!error) {
        setDraft("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmitMessage}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Write a message
      </Typography>
      <TextField
        label="What's on your mind now?"
        variant="outlined"
        value={draft}
        onChange={changeDraft}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" disabled={draft.length < 2}>
        Send
      </Button>
    </form>
  );
};

type Props = {
  username: string;
};
