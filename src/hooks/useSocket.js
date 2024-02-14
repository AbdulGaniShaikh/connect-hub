import { useDispatch } from 'react-redux';
import { addMessage } from './../redux/slices/messageSlice';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import sound from './../assets/sound/notification.wav';

var stompClient = null;
var senderId = null;

const useSocket = (userId) => {
  const dispatch = useDispatch();

  var audio = document.createElement('AUDIO');
  document.body.appendChild(audio);
  audio.src = sound;

  const onMessageRecieved = (payload) => {
    const body = JSON.parse(payload.body);
    dispatch(addMessage(body));
    document.getElementById('notification-audio');
    if (!window.location.pathname.startsWith('/inbox')) audio.play();
  };

  const connect = (userId) => {
    let Sock = new SockJS('http://localhost:8081/ws');
    stompClient = over(Sock);
    senderId = userId;
    stompClient.connect({}, onConnected, onError);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onConnected = () => {
    console.log('subscribed');
    stompClient.subscribe('/user/' + senderId + '/private', onMessageRecieved);
  };

  const publishMessage = (receiverId, message, isPost = false) => {
    if (!stompClient || !senderId) {
      return;
    }

    const chatMessage = {
      receiverId,
      senderId,
      message,
      post: isPost,
      date: new Date()
    };

    stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
    dispatch(addMessage(chatMessage));
  };

  const disconnect = () => {
    console.log('disconnecting');
    if (stompClient.connected) stompClient.disconnect(() => {});
  };

  return [publishMessage, connect, disconnect];
};

export default useSocket;
