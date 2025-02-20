import { io } from 'socket.io-client';

const URL = import.meta.env.DEV ? 'http://localhost:3000' : import.meta.env.VITE_SERVER_URL;

export const socket = io(URL, {
  autoConnect: false,
});