import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'lobby',
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('user connected to lobby', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('user disconeeds', client.id);
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);
    const response =
      data.length > 0 ? data.split('').join('.') : 'nothigToSend';
    this.server.emit('all', 'Se emitio un nuevo mensaje');
    client.broadcast.emit('all', `Hola from the other vato ${client.id}`);
  }
}
