import { useOnMount } from "@shared-hooks"
import { socket } from "../../socket"

export const useSocketEvent = <Payload,>(event:string, handler: (payload:Payload) => void) => {
  useOnMount(() => {
    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    }
  })
}

export const useSocketEventOnce = <Payload,>(event:string, handler:(payload:Payload) => void) => {
  useOnMount(() => {
    socket.once(event, handler);

    return () => {
      socket.off(event, handler);
    }
  })
}



