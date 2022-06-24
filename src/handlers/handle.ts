import { drawCircle, drawRectangle } from './drawFigure';
import { COMMAND } from '../constants';
import robot from 'robotjs';
import { captureScreen } from './captureScreen';

export const handleCommand = async (command: string, option: string[]) => {
  const [arg1, arg2] = option;

  let sendOption = '';
  const { x, y } = robot.getMousePos();
  switch (command) {
    case COMMAND.mousePosition:
      sendOption = `${x},${y}`;
      break;
    case COMMAND.mouseUp:
      robot.moveMouse(x + 1, y - +arg1);
      break;

    case COMMAND.mouseDwn:
      robot.moveMouse(x + 1, y + +arg1);
      break;

    case COMMAND.mouseLeft:
      robot.moveMouse(x - +arg1, y + 1);
      break;

    case COMMAND.mouseRight:
      robot.moveMouse(x + +arg1, y + 1);
      break;

    case COMMAND.drawRectangle:
      drawRectangle(+arg1, +arg2);
      break;

    case COMMAND.drawSquare:
      drawRectangle(+arg1, +arg1);
      break;

    case COMMAND.drawCircle:
      drawCircle(+arg1);
      break;

    case COMMAND.prntScrn:
      const raw = await captureScreen();
      sendOption = raw;
      break;

    default:
      break;
  }

  return sendOption;
};
