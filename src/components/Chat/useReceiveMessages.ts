import { useEffect } from "react";
import { socket } from "../../lib/socket";

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

  return;
};

type Props = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};
