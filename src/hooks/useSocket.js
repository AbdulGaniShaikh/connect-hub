import { useDispatch } from 'react-redux';
import { addMessage, increaseCount, newMessage } from '../redux/slices/messageSlice';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { backendUrl } from 'global';
// import sound from 'assets/sound/notification.wav';

var stompClient = null;
var senderId = null;

const useSocket = (userId) => {
  const dispatch = useDispatch();

  const onMessageRecieved = (payload) => {
    var path = window.location.pathname;
    const body = JSON.parse(payload.body);
    dispatch(addMessage(body));

    if (path !== `/inbox/${body.senderId}` && body.senderId !== senderId) {
      dispatch(increaseCount(body.senderId));
      dispatch(newMessage({ body, userId: senderId }));
    }
  };

  const connect = (userId) => {
    let Sock = new SockJS(`${backendUrl}/ws`);
    stompClient = over(Sock);
    senderId = userId;
    stompClient.connect({}, onConnected, onError);
  };

  const onError = (error) => {
    console.log(error);
  };

  const onConnected = () => {
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
  };

  const disconnect = () => {
    if (stompClient && stompClient.connected)
      stompClient.disconnect(() => {
        console.log('disconnecting');
      });
  };

  return [publishMessage, connect, disconnect];
};

export default useSocket;
