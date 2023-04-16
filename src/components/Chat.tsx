import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { spawn } from "child_process";

type Message = {
  authorName: string;
  authorId: string;
  content: string;
};

export const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [name, setName] = useState<string>("");
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [outgoingMessage, setOutgoingMessage] = useState("");

  useEffect(() => {
    console.log("socket connected", socket.connected);
  }, [socket.connected]);

  useEffect(() => {
    const onSocketConnect = () => {
      setIsConnected(true);
    };

    const onSocketDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onSocketConnect);
    socket.on("disconnect", onSocketDisconnect);

    return () => {
      socket.off("connect", onSocketConnect);
      socket.off("disconnect", onSocketDisconnect);
    };
  }, []);

  useEffect(() => {
    const onMessage = (message: Message) => {
      setMessages((messages) => [...messages, message]);
    };

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, []);

  const handleSubmitName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedName(name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeOutgoingMessage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOutgoingMessage(e.target.value);
  };

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = false;

    try {
      socket.emit("message", {
        authorName: name,
        content: outgoingMessage,
        authorId: socket.id,
      });
    } catch (error) {
      error = true;
    } finally {
      if (!error) {
        setOutgoingMessage("");
      }
    }
  };

  if (!submittedName) {
    return (
      <section>
        <form onSubmit={handleSubmitName}>
          <h2>Please enter your name:</h2>
          <input type="text" value={name} onChange={handleNameChange} />
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }

  return (
    <section>
      <h2>Messages</h2>
      <div>
        {messages.length > 0 ? (
          messages.map((message: Message) => (
            <div>
              {message.authorId === socket.id ? (
                <span>You said:</span>
              ) : (
                <span>From: {message.authorName}</span>
              )}
              <p>{message.content}</p>
            </div>
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>

      <form onSubmit={handleSubmitMessage}>
        <h3>Send a message</h3>
        <input
          type="text"
          onChange={handleChangeOutgoingMessage}
          value={outgoingMessage}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
