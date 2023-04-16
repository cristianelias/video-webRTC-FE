import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_WEBSOCKET_SERVER_URL || "http://localhost:9001"
);

console.log(
  "VITE_WEBSOCKET_SERVER_URL",
  import.meta.env.VITE_WEBSOCKET_SERVER_URL
);

console.log("VITE_WEBSOCKET_SERVER_URL", import.meta.env.WEBSOCKET_SERVER_URL);
