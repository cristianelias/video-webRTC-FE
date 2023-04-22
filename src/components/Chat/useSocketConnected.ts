import { useEffect } from "react";
import { socket } from "../../lib/socket";

export const useSocketConnected = ({ setConnected }: Props) => {
  useEffect(() => {
    const onSocketConnect = () => {
      console.log(`socket connected with id ${socket.id}`);
      setConnected(true);
    };

    const onSocketDisconnect = () => {
      console.log("socket disconnected");
      setConnected(false);
    };

    socket.on("connect", onSocketConnect);
    socket.on("disconnect", onSocketDisconnect);

    return () => {
      socket.off("connect", onSocketConnect);
      socket.off("disconnect", onSocketDisconnect);
    };
  }, []);

  return;
};

type Props = {
  setConnected: (connected: boolean) => void;
};
