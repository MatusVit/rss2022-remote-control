import dotenv from 'dotenv';

dotenv.config();
export const HTTP_PORT = Number(process.env.HTTP_PORT) || 3000;
export const WS_PORT = Number(process.env.WS_PORT) || 8080;
export const CAPTURE_SIZE = Number(process.env.CAPTURE_SIZE) || 200;

export const enum COMMAND {
  mouseUp = 'mouse_up',
  mouseDwn = 'mouse_down',
  mouseLeft = 'mouse_left',
  mouseRight = 'mouse_right',
  mousePosition = 'mouse_position',
  drawCircle = 'draw_circle',
  drawRectangle = 'draw_rectangle',
  drawSquare = 'draw_square',
  prntScrn = 'prnt_scrn',
}
