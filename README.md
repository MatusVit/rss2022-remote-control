# RSSchool Websocket Remote Control

Remote control backend using RobotJS library and websocket

## How to install

1. Download or clone this repository

   > git clone git@github.com:MatusVit/rss2022-remote-control.git

   or

   > git clone https://github.com/MatusVit/rss2022-remote-control.git select branch 'task03' git

   > checkout task4 ​

2. Install dependencies
   > npm install

## How to use

development mode

> npm run start:dev

production mode

> npm run start

Open http://localhost:3000

WebSocket URL by default ws://localhost:8080

## Base commands

### Navigation over the x and y axis

- move mouse up - keyboard "up" button
- move mouse down - keyboard "down" button
- move mouse left - keyboard "left" button
- move mouse right - keyboard "right" button
- get mouse coordinates - keyboard "p" button

### Drawing

- draw circle - keyboard "c" button
- draw rectangle - keyboard "r" button
- draw square - keyboard "c" button

### Print screen

get part of screen image - keyboard "LCtrl+p" button
