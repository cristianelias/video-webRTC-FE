import { useState } from "react";
import { SignUp } from "../SignUp";
import { ActiveConversation } from "../ActiveConversation/ActiveConversation";
import { ChatInput } from "../ChatInput";
import { useSocketConnected } from "./useSocketConnected";
import { useReceiveMessages } from "./useReceiveMessages";
import { User } from "../../types/Users";
import { useConnectedUsers } from "./useConnectedUsers";
import { ConversationSelector } from "../ConversationSelector/ConversationSelector";
import { Message } from "../../types/Message";
import { ChatLayout } from "./ChatLayout";
import { css } from "@emotion/react";

export const Chat = () => {
  const [username, setUsername] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeConversationId, setActiveConversationId] =
    useState<string>("public");

  useSocketConnected({ setConnected });
  useConnectedUsers({ setUsers });
  useReceiveMessages({ messages, setMessages });

  if (!username) {
    return (
      <ChatLayout>
        <SignUp setUsername={setUsername} />
      </ChatLayout>
    );
  }

  if (!connected) {
    return (
      <ChatLayout>
        <div css={styles.connectingContainer}>Connecting...</div>
      </ChatLayout>
    );
  }

  return (
    <ChatLayout stylesOverrides={styles.chatLayoutOverrides}>
      <div css={styles.innerWrapper}>
        <ConversationSelector
          setActiveConversationId={setActiveConversationId}
          users={users}
        />

        <ActiveConversation
          allMessages={messages}
          users={users}
          activeConversationId={activeConversationId}
        />
      </div>

      <ChatInput
        username={username}
        activeConversationId={activeConversationId}
      />
    </ChatLayout>
  );
};

const styles = {
  connectingContainer: css`
    font-size: 1.5rem;
    line-height: 2rem;
  `,

  chatLayoutOverrides: css`
    flex-direction: column;
    justify-content: space-between;
  `,

  innerWrapper: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    flex-grow: 1;
  `,
};
