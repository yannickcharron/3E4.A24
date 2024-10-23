import http from 'http';
import express from 'express';
import chalk from 'chalk';

import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';

const PORT = 9876;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

//TODO: configuration des dossiers statiques
app.use(express.static('web'));
app.use(express.static('public'));

//TODO: Connexion des clients
socketServer.on(IOEVENTS.CONNECTION, client => {
  console.log(client.id);

  //Réception de SEND_MESSAGE
  client.on(IOEVENTS.SEND_MESSAGE, message => {
    console.log(message);
    //Nouveau message reçu d'un client
    const newMessageToBroadcast = {
      sender: client.id,
      text : message.text,
      datetime: dayjs.utc()
    };

    
    //Envoyer à tous les clients (socketServer.emit == broadcast)
    socketServer.emit(IOEVENTS.SEND_BACK_MESSAGE, newMessageToBroadcast);

  });

  client.on(IOEVENTS.DISCONNECT, reason => {
    console.log(reason);
  })

});

async function newUser(socket) {}

async function sendUserIdentities() {}

function randomAvatarImage() {
  const avatarNumber = Math.floor(Math.random() * 8 + 1);
  return `./images/avatar${avatarNumber}.png`;
}

httpServer.listen(PORT, () => {
  console.log(chalk.blue(`Server listening on ${PORT}`));
});
