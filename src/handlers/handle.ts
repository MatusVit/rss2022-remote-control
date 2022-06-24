import { COMMAND } from '../constants';
import robot from 'robotjs';

export const handleCommand = (command: string, option: string[]) => {
  let sendOption = '';
  const { x, y } = robot.getMousePos();
  switch (command) {
    case COMMAND.mousePosition:
      sendOption = `${x},${y}`;
      break;
    case COMMAND.mouseUp:
      robot.moveMouse(x + 1, y - +option);
      break;

    case COMMAND.mouseDwn:
      robot.moveMouse(x + 1, y + +option);
      break;

    case COMMAND.mouseLeft:
      robot.moveMouse(x - +option, y + 1);
      break;

    case COMMAND.mouseRight:
      robot.moveMouse(x + +option, y + 1);
      break;

    case COMMAND.drawRectangle:
      const radius = +option;
      robot.mouseToggle('down');
      for (let i = 0; i < 360; i++) {
        robot.dragMouse(x + radius * Math.cos(i), y + radius * Math.sin(i));
      }
      robot.mouseToggle('up');
      break;

    // case COMMAND.drawCircle:
    //   const radius = +option;
    //   robot.mouseToggle('down');
    //   for (let i = 0; i < 360; i++) {
    //     robot.dragMouse(x + radius * Math.cos(i), y + radius * Math.sin(i));
    //   }
    //   robot.mouseToggle('up');
    //   break;

    default:
      break;
  }

  return sendOption;
};
