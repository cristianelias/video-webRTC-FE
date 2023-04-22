import { useEffect } from "react";
import { socket } from "../../lib/socket";

export const useSocketConnected = () => {
  useEffect(() => {
    const onSocketConnect = () => {
      console.log(`socket connected with id ${socket.id}`);
    };

    const onSocketDisconnect = () => {
      console.log("socket disconnected");
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
