import IOEVENTS from '../../io-events.js';

const socket = io(); //Possibilité de fournir un URL

$(document).ready(() => {
  $('#btnSend').click(() => {
    sendMessage();
  });

  $('#txtMessage').keyup((e) => {
    if (e.keyCode === 13) {
        sendMessage();
    }
  });

  $('#btnUpdateUsername').click(() => {});
});

function sendMessage() {
  const messageToSend = {
    text: $('#txtMessage').val(),
  };
  socket.emit(IOEVENTS.SEND_MESSAGE, messageToSend);
  $('#txtMessage').val('');
}

//TODO: Réceptions des évenements
socket.on(IOEVENTS.SEND_BACK_MESSAGE, (message) => {
  const messageLi = createMessageUI(message, message.sender === socket.id);
  $('#chat-messages').append(messageLi);
});

function createMessageUI(message, isFromMe) {
  let messageLi = '';

  if (isFromMe) {
    messageLi = `<li class='chat-right'>
                <div class='chat-hour'>${dayjs(message.datetime).format()}<span class='fa fa-check-circle'></span></div>
                <div class='chat-text'>${message.text}</div>
                <div class='chat-avatar'>
                    <img src='' alt=''>
                    <div class='chat-name'>NAME</div>
                </div>
            </li>`;
  } else {
    messageLi = `<li class='chat-left'>
            <div class='chat-avatar'>
            <img src='' alt=''>
            <div class='chat-name'>NAME</div>
            </div>  
            <div class='chat-text'>${message.text}</div>
            <div class='chat-hour'>${dayjs(message.datetime).format()}<span class='fa fa-check-circle'></span></div>
        </li>`;
  }

  return messageLi;
}

function createUserUI(user) {
  const userLi = `<li class='person' data-chat='ID'>
            <div class='user'>
                <img src='' alt=''>
            </div>
            <p class='name-time'>
                <span class='name'>NAME</span>
            </p>
        </li>`;

  return userLi;
}
