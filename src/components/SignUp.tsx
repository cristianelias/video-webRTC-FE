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
    <div>
      <h5>Please enter your name</h5>
      <form onSubmit={handleSubmitName}>
        <div>
          <input placeholder="Name" value={name} onChange={handleNameChange} />
          <button type="submit" disabled={name.length < 2}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

type Props = {
  setUsername: (username: string) => void;
};
