import { useState } from "react";
import { socket } from "../lib/socket";

export const ChatInput = ({ username, activeConversationId }: Props) => {
  const [draft, setDraft] = useState("");
  const writingPublicMessage = activeConversationId === "public";

  const changeDraft = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(e.target.value);
  };

  const sendMessageOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    <footer>
      <h4>Write a message</h4>
      <textarea
        placeholder="What's on your mind now?"
        value={draft}
        onChange={changeDraft}
        onKeyDown={sendMessageOnEnter}
      />
      <button onClick={sendMessage} disabled={draft.length < 2}>
        Send
      </button>
    </footer>
  );
};

type Props = {
  username: string;
  activeConversationId: string;
};
