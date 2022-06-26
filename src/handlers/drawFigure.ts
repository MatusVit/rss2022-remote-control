import robot from 'robotjs';

export const drawCircle = (radius: number): void => {
  const mousePos = robot.getMousePos();
  robot.setMouseDelay(1);
  robot.mouseToggle('down');
  for (let i = Math.PI * 2; i >= 0; i -= 0.01) {
    const x = mousePos.x + radius * Math.sin(i);
    const y = mousePos.y + radius * Math.cos(i) - radius;
    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');
};

export const drawRectangle = (width: number, height: number): void => {
  const { x, y } = robot.getMousePos();

  robot.mouseToggle('down');
  for (let i = 0; i < width; i++) {
    robot.dragMouse(x + i, y);
  }

  const xEnd = x + width;
  for (let i = 0; i < height; i++) {
    robot.dragMouse(xEnd, y + i);
  }

  const yEnd = y + height;
  for (let i = 0; i < width; i++) {
    robot.dragMouse(xEnd - i, yEnd);
  }

  for (let i = 0; i < height; i++) {
    robot.dragMouse(x, yEnd - i);
  }
  robot.mouseToggle('up');
};
