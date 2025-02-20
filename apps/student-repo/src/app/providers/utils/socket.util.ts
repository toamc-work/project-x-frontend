import { Logger } from "@factories";
import {socket} from '../../../socket'
// export const useSocketEmit = <Payload,>(event:string, payload:Payload, handler: () => void) => {
//   socket.emit(event, payload, handler);
// }


// export const useSocketEmitAck = <Payload,>(event:string, payload:Payload, handler: () => void) => {
//   socket.emit(event, payload, handler);
// }

class SocketUtils {
  private readonly logger = new Logger(SocketUtils.name)
  
  emit<Payload,>(event:string, payload:Payload, handler: () => void) {
      socket.emit(event, payload, handler);
  }

  async emitWithAck<Payload, AckResponse>(event:string, payload:Payload, handler: () => void, timeout?:number):Promise<AckResponse> {
    try {
      let response:ApiResponse<AckResponse>

      if(timeout) {
        response = await socket.timeout(timeout).emitWithAck(event, payload, handler);
      }
      else {
        response = await socket.emitWithAck(event, payload, handler);
      }

      return response.data;
    } catch(error) {
      this.logger.error((error as Error).message);
      throw error;
    }
  }
}

export default new SocketUtils();