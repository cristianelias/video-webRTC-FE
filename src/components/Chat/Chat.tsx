import { useState } from "react";
import { SignUp } from "../SignUp";
import { ActiveConversation } from "../ActiveConversation/ActiveConversation";
import { ChatInput } from "../ChatInput";
import { useSocketConnected } from "./useSocketConnected";
import { useReceiveMessages } from "./useReceiveMessages";
import { User } from "../../types/Users";
import { useConnectedUsers } from "./useConnectedUsers";
import { ConversationSelector } from "../ConversationSelector";

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
    return <SignUp setUsername={setUsername} />;
  }

  if (!connected) {
    return <div>Connecting...</div>;
  }

  return (
    <div>
      <ConversationSelector
        setActiveConversationId={setActiveConversationId}
        users={users}
      />

      <ActiveConversation
        allMessages={messages}
        users={users}
        activeConversationId={activeConversationId}
      />

      <ChatInput
        username={username}
        activeConversationId={activeConversationId}
      />
    </div>
  );
};
