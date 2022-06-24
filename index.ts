import { httpServer } from './src/http_server/index.js';
import Jimp from 'jimp';
import robot, { moveMouse } from 'robotjs';
import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';
import { pipeline } from 'stream';
import { TransportStream } from './src/streams/Transport.js';
import { handleCommand } from './src/handlers/handle';
import { HTTP_PORT } from './src/constants';

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

const socketArray: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
  const wsStream = createWebSocketStream(ws);
  socketArray.push(ws);

  wsStream.on('data', (data) => {
    console.log('received: %s', data);

    const [command, ...option] = data.toString().split(' ');

    const sendOptionString = handleCommand(command, option);
    console.log('sendOptionString=', sendOptionString);

    ws.send(`${command} ${sendOptionString}\0`);
  });
});

process.on('SIGINT', () => {
  console.log('1 socketArray=', socketArray);

  socketArray.forEach((ws) => {
    ws.close();
  });
  process.exit(0);
});
