import { useEffect } from "react";
import { socket } from "../../lib/socket";
import { Message } from "../../types/Message";

export const useReceiveMessages = ({ messages, setMessages }: Props) => {
  useEffect(() => {
    const onMessage = (message: Message) => {
      // @ts-ignore
      setMessages((messages) => [...messages, message]);
    };

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, []);

  useEffect(() => {
    console.log("messages", JSON.stringify(messages, null, 2));
  }, [messages]);

  return;
};

type Props = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};
