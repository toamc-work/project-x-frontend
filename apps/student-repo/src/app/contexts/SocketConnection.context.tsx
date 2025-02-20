import React, { createContext, useState } from 'react';
import { useOnMount } from '@shared-hooks';
import { socket } from '../../socket';

type SocketConnectionContextProviderProps = {
  children: React.JSX.Element;
};

type SocketConnectionContextType = {
  isConnected: boolean;
  forceConnection:() => void;
  forceDisconnection:() => void;
};

export const SocketConnectionContext = createContext(
  {} as SocketConnectionContextType
);

export const SocketConnectionContextProvider = React.memo(({
  children,
}: SocketConnectionContextProviderProps) => {
  const [isConnected, setConnection] = useState<boolean>(false);

  useOnMount(() => {
    socket.connect();


    return () => {
      socket.disconnect();
    }
  })

  useOnMount(() => {
    const onConnect = () => {
      setConnection(() => true);
    }

    const onDisconnect = () => {
      setConnection(() => false);
    }
    socket.on('connect', onConnect)

    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    }
  })


  const forceConnection = () => {
    socket.connect();
  }

  const forceDisconnection = () => {
    socket.disconnect();
  }

  return (
    <SocketConnectionContext.Provider
      value={{isConnected, forceConnection, forceDisconnection}}
    >
      {children}
    </SocketConnectionContext.Provider>
  );
});
