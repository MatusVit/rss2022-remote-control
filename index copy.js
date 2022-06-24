import Jimp from 'jimp';
import { httpServer } from './src/http_server/index.js';
import robot from 'robotjs';
import WebSocket, { createWebSocketStream, WebSocketServer } from 'ws';
import { pipeline } from 'stream';
import { TransportStream } from './src/streams/Transport.js';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

const transportStream = new TransportStream();

// transportStream.on('data', (data) => {
//   console.log(`transportStream data= ${data}`);
// });

// const ws = new WebSocket('wss://websocket-echo.com/');
wss.on('connection', (ws) => {
  console.log('connection WS');
  const wsStream = createWebSocketStream(ws);
  wsStream.pipe(transportStream);
  // transportStream.on('data', (data) => {
  //   console.log(`transportStream data= ${data}`);
  //   wsStream.push(data);
  // });
  transportStream.pipe(wsStream);

  // pipeline(wsStream, transportStream, wsStream, (error) => {
  //   if (error) console.log(`Error pipline ${error}`);
  //   else console.log(`Pipline OK`);
  // });

  // ws.on('message', (data) => {
  //   console.log(`message: ${data}`);
  //   ws.send(`${data} - something answer`);
  // });
});
