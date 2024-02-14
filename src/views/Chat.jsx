import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom/dist';

import chatService from 'service/chatService';
import { postService, toastService, userService } from 'service';
import { imageUrl } from 'global';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from './../redux/slices/userInfoSlice';
import { selectMessages, setMessages } from './../redux/slices/messageSlice';
import useSocket from 'hooks/useSocket';
import { useIsVisible } from 'hooks/useIsVisible';
import { user } from 'assets/icons';

const Chat = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const { userId } = useSelector(selectUserInfo);
  const [page, setPage] = useState(0);

  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);
  const [val, setVal] = useState('');
  const [publishMessage] = useSocket();
  var messageEnd = useRef(null);
  var messageStart = useRef(null);
  const isVisible = useIsVisible(messageStart);

  useEffect(() => {
    if (isVisible) {
      fetchMessages();
    }
  }, [isVisible]);

  const sendMessage = () => {
    if (!id) return;
    if (val.trim().length === 0) return;
    publishMessage(id, val, false);
    setVal('');
  };

  const onChange = (e) => {
    setVal(e.target.value);
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const clearMessages = () => {
    dispatch(setMessages([]));
  };

  useEffect(() => {
    setPage(0);
    return clearMessages;
  }, []);

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, [val]);

  useEffect(() => {
    if (!userId) return;
    if (!id) return;
    userService.getUser(id).then((res) => {
      if (res.status === 200) {
        setUser(res.data.payload);
      }
    });
    fetchMessages();
    messageEnd.scrollIntoView({ behavior: 'smooth' });
  }, [userId, id]);

  useEffect(() => {
    messageEnd.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  var prevDate = '';

  const fetchMessages = () => {
    chatService
      .fetchMessages(userId, id, page)
      .then((res) => {
        if (res.status === 200) {
          if (res.data?.messages.content.length > 0) {
            dispatch(setMessages([...res.data.messages.content.reverse(), ...messages]));
            setPage(page + 1);
          }
        }
      })
      .catch((error) => {
        if (error?.response?.status >= 500) {
          toastService.error('Internal Server Error');
        }
      })
      .finally(() => {});
  };

  return (
    <div className="flex w-full mx-5 mb-5 rounded-3xl flex-col h-chat bg-white  py-2 pl-5 overflow-hidden">
      <ProfileChat {...user} />
      <div className="grid grow overflow-y-scroll pt-2 pr-5">
        <div ref={messageStart} id="chat-top"></div>
        <div>
          {messages.map((message) => {
            const options = {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            };
            var currDate = null;
            try {
              currDate = new Intl.DateTimeFormat('en-US', options).format(new Date(message.date));
            } catch (err) {
              currDate = prevDate;
            }
            if (prevDate !== currDate) {
              prevDate = currDate;
              return (
                <>
                  <DateBreaker date={currDate} />
                  <Message {...message} userId={userId} />
                </>
              );
            }

            return <Message {...message} userId={userId} />;
          })}
          <div ref={(el) => (messageEnd = el)} id="chat-bottom"></div>
        </div>
      </div>

      <div className="flex justify-center items-start flex-row mr-5 mb-3 gap-x-1">
        <textarea
          alt="post-data"
          type="text"
          name="post-data"
          id="post-data"
          value={val}
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder="type your message here"
          className="bg-gray-100 text-gray-900 focus:outline-none w-full text-sm p-2.5 resize-none"
          ref={textAreaRef}
        ></textarea>
        {val.trim().length > 0 && (
          <p onClick={() => sendMessage()} className="text-primaryColor font-bold cursor-pointer p-2.5">
            Send
          </p>
        )}
      </div>
    </div>
  );
};

const ProfileChat = (props) => {
  const { userId, username, profileImageId, lastSeen, email } = props;
  const [isActive, setIsActive] = useState(false);
  const [lastSeenText, setLastSeenText] = useState('');

  useEffect(() => {
    var last = new Date(lastSeen);
    var currentDate = new Date();

    if ((currentDate.getTime() - last.getTime()) / (1000 * 60) <= 5) {
      setIsActive(true);
      return;
    }
    const options = {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    try {
      setLastSeenText(new Intl.DateTimeFormat('en-US', options).format(new Date(lastSeen)));
    } catch (err) {
      console.log(err);
      setLastSeenText(email);
    }
  }, [lastSeen]);
  return (
    <div className="grid gap-y-3 h-fit pr-5">
      <Link to={`/users/${userId}`} className="flex overflow-hidden items-center justify-center mr-5">
        <img
          src={profileImageId ? `${imageUrl}/${profileImageId}` : null}
          alt={userId}
          className="rounded-full h-circleImage w-circleImage aspect-square object-cover"
        />
        <div className=" text-gray-900 text-sm px-2.5 overflow-hidden">
          <p className="font-medium overflow-ellipsis overflow-hidden ">{username}</p>
          <div className="text-xs overflow-ellipsis overflow-hidden">
            {isActive && (
              <div className="flex justify-start gap-x-1 items-center">
                <p className="rounded-full bg-green-500 p-1 h-2 w-2"></p>
                <span>Active now</span>
              </div>
            )}
            {!isActive && <p>Last seen {lastSeenText}</p>}
          </div>
        </div>
      </Link>
      <hr />
    </div>
  );
};

const DateBreaker = ({ date }) => {
  return (
    <div className="grid grid-cols-5 items-center ">
      <hr className="grow h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
      <hr className="grow h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
      <p className="grow-0 justify-self-center text-xs">{date}</p>
      <hr className="grow h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
      <hr className="grow h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
    </div>
  );
};

const Message = (props) => {
  const { message, senderId, userId, post, date } = props;
  var chatAlignLeft = senderId !== userId;
  var bgColor = chatAlignLeft ? 'bg-gray-100' : 'bg-chatRecieverColor';
  var textColor = chatAlignLeft ? '' : 'text-white';

  const options = {
    hour: '2-digit',
    minute: '2-digit'
  };
  var time = null;
  try {
    time = new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  } catch (err) {
    time = 'now';
  }

  return (
    <div className={`mb-2 flex items-center justify-${chatAlignLeft ? 'start' : 'end'}`}>
      {!chatAlignLeft && <span className="text-xs px-2">{time}</span>}
      {post ? (
        <PostMessage postId={message} />
      ) : (
        <TextMessage message={message} bgColor={bgColor} textColor={textColor} />
      )}
      {chatAlignLeft && <span className="text-xs px-2">{time}</span>}
    </div>
  );
};
const TextMessage = ({ message, bgColor, textColor }) => {
  return <span className={`px-5 py-1 rounded-2xl max-w-64 ${bgColor} ${textColor}`}>{message}</span>;
};

const PostMessage = ({ postId }) => {
  const [post, setPost] = useState({});
  useEffect(() => {
    postService
      .getPost(postId)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setPost(res.data?.payload);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col w-80 rounded-3xl overflow-hidden border">
      <div className="grid bg-gray-50">
        <Link to={`/users/${post.userId}`} className="flex items-center justify-start p-3">
          <img
            src={post.profileImageId ? `${imageUrl}/${post.profileImageId}` : user}
            alt={post.userId}
            className="rounded-full  h-circleImage w-circleImage aspect-square object-cover bg-gray-200"
          />
          <div className=" text-gray-900 text-sm px-2.5 overflow-hidden">
            <p className="font-medium overflow-ellipsis overflow-hidden ">{post.username}</p>
          </div>
        </Link>
        <hr />
      </div>
      {post.text && <div className="p-3">{post.text}</div>}
      {post.imageId && (
        <div className="flex mx-3 mt-2 justify-center items-start  center rounded-md mb-3 bg-gray-100 overflow-hidden">
          <img
            src={post.imageId ? `${imageUrl}/${post.imageId}` : user}
            alt="post"
            className="object-contain aspect-video"
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
