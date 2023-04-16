const webSocketServerURL = import.meta.env.WEBSOCKET_SERVER_URL;
import { io } from "socket.io-client";

export const socket = io(webSocketServerURL || "http://localhost:9001");
