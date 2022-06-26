import { HTTP_PORT, WS_PORT, CAPTURE_SIZE } from './src/constants';
import { httpServer } from './src/http_server/index.js';
import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';
import { handleCommand } from './src/handlers/handle';

httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);

const wss = new WebSocketServer({ port: WS_PORT }, () => {
  console.log(`Start WebSocket Server on the ${WS_PORT} port!`);
});
const socketArray: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
  socketArray.push(ws);
  const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  wsStream.on('data', async (data) => {
    try {
      const [command, ...option] = data.toString().split(' ');

      const sendOptionString = await handleCommand(command, option);
      const sendString = `${command} ${sendOptionString}\0`;

      wsStream.write(sendString);
    } catch (error) {
      console.log('Oops! Error handle:', error);
    }
  });
});

process.on('SIGINT', () => {
  socketArray.forEach((ws) => {
    ws.close();
  });
  process.exit(0);
});
