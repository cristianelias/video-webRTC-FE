import { useEffect, useState } from "react";
import { socket } from "../../lib/socket";
import { Box, Button, TextField, Typography } from "@mui/material";
import { PrivateConversations } from "../PrivateConversations";
import { SignUp } from "../SignUp";
import { PublicConversation } from "../PublicConversation";
import { ActiveConversation } from "../ActiveConversation";
import { ChatInput } from "../ChatInput";
import { useSocketConnected } from "./useSocketConnected";
import { useReceiveMessages } from "./useReceiveMessages";

export const Chat = () => {
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useSocketConnected();
  useReceiveMessages({ messages, setMessages });

  if (!username) {
    return <SignUp setUsername={setUsername} />;
  }

  return (
    <div>
      {/* List public and private conversations */}
      <section>
        <PublicConversation />
        <PrivateConversations />
      </section>

      {/* Active conversation  */}
      <ActiveConversation username={username} messages={messages} />

      {/* Chat input */}
      <footer>
        <ChatInput username={username} />
      </footer>
    </div>
  );
};
