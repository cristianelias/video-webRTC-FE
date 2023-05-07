import { useState } from "react";
import { socket } from "../lib/socket";
import { Button } from "./Button";
import { css } from "@emotion/react";

export const ChatInput = ({ username, activeConversationId }: Props) => {
  const [draft, setDraft] = useState("");
  const writingPublicMessage = activeConversationId === "public";

  const changeDraft = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
  };

  const sendMessageOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    let error = false;

    try {
      socket.emit("message", {
        content: draft,
        authorUsername: username,
        authorId: socket.id,
        public: writingPublicMessage,
        to: writingPublicMessage ? null : activeConversationId,
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
    <footer css={styles.footer}>
      <input
        placeholder="What's on your mind now?"
        value={draft}
        onChange={changeDraft}
        onKeyDown={sendMessageOnEnter}
        css={styles.input}
      />
      <Button
        styleOverrides={styles.buttonOverrides}
        onClick={sendMessage}
        disabled={draft.length < 2}
      >
        Send
      </Button>
    </footer>
  );
};

type Props = {
  username: string;
  activeConversationId: string;
};

const styles = {
  footer: css`
    display: flex;
    padding: 1.5rem;
    align-self: center;
    place-self: end;
    width: 100%;
    gap: 1rem;
  `,

  input: css`
    padding: 1rem;
    width: 100%;
    border-radius: 0.5rem;
  `,
  buttonOverrides: css`
    padding: 1rem;
    border-radius: 0.5rem;
    border-width: 0;

    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  `,
};
