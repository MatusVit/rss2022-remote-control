import { httpServer } from './src/http_server/index.js';
import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';
import { handleCommand } from './src/handlers/handle';
import { HTTP_PORT } from './src/constants';

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

const socketArray: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
  socketArray.push(ws);
  const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  wsStream.on('data', async (data) => {
    const [command, ...option] = data.toString().split(' ');

    const sendOptionString = await handleCommand(command, option);
    const sendString = `${command} ${sendOptionString}\0`;

    wsStream.write(sendString);
  });
});

process.on('SIGINT', () => {
  socketArray.forEach((ws) => {
    ws.close();
  });
  process.exit(0);
});
