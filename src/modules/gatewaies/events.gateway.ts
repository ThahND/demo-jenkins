import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersRepository } from '../repositories/users.repository';
import IJwtPayload from 'src/auth/payloads/jwt-payload';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    private jwtService: JwtService,
    private usersRepo: UsersRepository,
  ) {}

  @WebSocketServer()
  server: Server;
  onlines: string[] = []; // List id user online
  clients = {}; // { clientId: userId }

  @SubscribeMessage('ONLINES')
  async handleEventOnlines(@MessageBody() data?: any) {
    this.server.sockets.emit('ONLINES', {
      statusCode: 200,
      data: { onlines: this.onlines },
    });
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string) {
    this.server.emit('events', data);
  }

  async handleConnection(client: Socket) {
    const arrAuthor = client?.request?.headers?.authorization?.split(' ');

    try {
      const token = arrAuthor[1];
      const user: IJwtPayload = await this.jwtService.verify(token);
      const iUser = await this.usersRepo.findUserByID(user.id);
      if (!iUser) client.disconnect();

      if (!iUser.token.includes(token)) client.disconnect();

      this.clients[client.id] = user.id;
      this.onlines.push(user.id);
      this.handleEventOnlines();
      console.log(client.id + ` - ${iUser.email}` + ' - connect...');
    } catch (e) {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    //
    for await (const [index, clientId] of this.onlines.entries()) {
      if (clientId === this.clients[client.id]) {
        this.onlines.splice(index, 1);
        delete this.clients[client.id];
        break;
      }
    }

    this.handleEventOnlines();
    console.log(client.id + ' - disconnect!');
  }

  afterInit(server: any) {
    // Code
  }
}
