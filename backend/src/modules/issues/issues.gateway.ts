import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class IssuesGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket): void {
    // TODO: test
    setInterval(() => {
      socket.emit('updateBoardIssues');
    }, 10000);
  }

  @SubscribeMessage('sendUpdateBoardIssues')
  // @MessageBody() content: string, @ConnectedSocket() socket: Socket
  async updateBoardIssues(): Promise<void> {
    this.server.sockets.emit('updateBoardIssues');
  }
}
