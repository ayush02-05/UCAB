import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      transports: ["websocket"],
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Socket Connected:", newSocket.id);
      setConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket Disconnected");
      setConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendEvent = (eventName, data) => {
    if (!socket) return;
    socket.emit(eventName, data);
  };

  const listenEvent = (eventName, callback) => {
    if (!socket) return;
    socket.on(eventName, callback);
  };

  const removeListener = (eventName) => {
    if (!socket) return;
    socket.off(eventName);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        sendEvent,
        listenEvent,
        removeListener,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
