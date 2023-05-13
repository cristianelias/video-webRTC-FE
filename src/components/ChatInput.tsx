import { useState } from "react";
import { socket } from "../lib/socket";
import { Button } from "./Button";
import { css } from "@emotion/react";
import { ReactComponent as SmileyFace } from "../assets/icons/smiley-face.svg";
import { ReactComponent as Send } from "../assets/icons/send.svg";

export const ChatInput = ({ activeConversationId }: Props) => {
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
    <div css={styles.container}>
      <div css={styles.leftColumn}>
        <SmileyFace />
      </div>

      <input
        placeholder="Type a message"
        value={draft}
        onChange={changeDraft}
        onKeyDown={sendMessageOnEnter}
        css={styles.input}
      />

      <div css={styles.button(draft.length < 2)} onClick={sendMessage}>
        <Send />
      </div>
    </div>
  );
};

type Props = {
  activeConversationId: string;
};

const styles = {
  container: css`
    display: flex;
    justify-content: space-between;
    width: 80%;
    gap: 1rem;
    background-color: white;
    align-self: center;
    padding: 8px 16px;
    border-radius: 12px;
    margin-bottom: 24px;
  `,

  button: (disabled: boolean) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${disabled ? 0.5 : 1};
    transition: opacity 0.2s ease-in-out;
    cursor: ${disabled ? "not-allowed" : "pointer"};
  `,

  leftColumn: css`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  input: css`
    padding: 1rem;
    width: 100%;
    border-radius: 0.5rem;
    border: none;
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
