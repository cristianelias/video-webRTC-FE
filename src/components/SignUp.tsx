import { useState } from "react";
import { socket } from "../lib/socket";
import { Button } from "./Button";
import { css } from "@emotion/react";

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
    <div css={styles.container}>
      <h5 css={styles.heading}>Please enter your name</h5>
      <form onSubmit={handleSubmitName} css={styles.form}>
        <input
          css={styles.input}
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <Button type="submit" disabled={name.length < 2}>
          Submit
        </Button>
      </form>
    </div>
  );
};

type Props = {
  setUsername: (username: string) => void;
};

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
  `,

  heading: css`
    font-size: 1.125rem;
    line-height: 1.75rem;
  `,

  form: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  `,

  input: css`
    padding: 0.5rem;
    border-radius: 0.5rem;
    border-width: 0;
  `,
};
