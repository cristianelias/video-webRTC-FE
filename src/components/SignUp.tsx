import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { socket } from "../lib/socket";

export const SignUp = ({ setUsername }: Props) => {
  const [name, setName] = useState("");

  const handleSubmitName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(name);
    socket.auth = { username: name };
    socket.connect();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

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
};

type Props = {
  setUsername: (username: string) => void;
};
