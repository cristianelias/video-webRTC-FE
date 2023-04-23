import { useEffect, useState } from "react";
import { socket } from "../../lib/socket";
import { Box, Button, TextField, Typography } from "@mui/material";
import { PrivateConversations } from "../PrivateConversations/PrivateConversations";
import { SignUp } from "../SignUp";
import { PublicConversation } from "../PublicConversation";
import { ActiveConversation } from "../ActiveConversation";
import { ChatInput } from "../ChatInput";
import { useSocketConnected } from "./useSocketConnected";
import { useReceiveMessages } from "./useReceiveMessages";
import { User } from "../../types/Users";
import { useConnectedUsers } from "../PrivateConversations/useConnectedUsers";

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
    return <Typography>Connecting...</Typography>;
  }

  return (
    <div>
      {/* List public and private conversations */}
      <section>
        <PublicConversation setActiveConversationId={setActiveConversationId} />
        <PrivateConversations
          setActiveConversationId={setActiveConversationId}
          users={users}
        />
      </section>

      {/* Active conversation  */}
      <ActiveConversation
        username={username}
        messages={messages}
        users={users}
        activeConversationId={activeConversationId}
      />

      {/* Chat input */}
      <footer>
        <ChatInput username={username} />
      </footer>
    </div>
  );
};
