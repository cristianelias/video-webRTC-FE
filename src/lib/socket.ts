import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL, {
  withCredentials: true,
  autoConnect: false,
});
