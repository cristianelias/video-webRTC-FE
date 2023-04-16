import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_WEBSOCKET_SERVER_URL || "http://localhost:9001",
  { withCredentials: true }
);
