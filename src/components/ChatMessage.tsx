import { socket } from "../lib/socket";
import { Message } from "../types/Message";
import { parseTimestamp } from "../utils/date";

export const ChatMessage = ({ message }: Props) => {
  const isOwnMessage = message.authorId === socket.id;

  return (
    <div>
      {isOwnMessage ? (
        <h4>You said:</h4>
      ) : (
        <h4>{`From: ${message.authorUsername}`}</h4>
      )}
      <h4>{message.content}</h4>
      <div>Sent at: {parseTimestamp(message.timestamp)}</div>
    </div>
  );
};

type Props = {
  message: Message;
};
