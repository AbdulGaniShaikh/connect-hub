import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom/dist';
import chatService from 'service/chatService';
import { postService, toastService, userService } from 'service';
import { imageUrl } from 'global';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from './../redux/slices/userInfoSlice';
import { descreaseCount, selectInbox, selectMessages, setMessages } from './../redux/slices/messageSlice';
import useSocket from 'hooks/useSocket';
import { useIsVisible } from 'hooks/useIsVisible';
import userIcon from 'assets/icons/user.svg';
import useErrorBehavior from 'hooks/useErrorBehavior';
import Linkify from 'components/shared/Linkify';
import ProfileImage from 'components/shared/ProfileImage';

const Chat = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const { userId } = useSelector(selectUserInfo);
  var { inbox } = useSelector(selectInbox);
  const [page, setPage] = useState(0);
  const [relation, setRelation] = useState('NONE');
  const defaultErrorBehavior = useErrorBehavior();

  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);
  const [val, setVal] = useState('');
  const [publishMessage] = useSocket();
  var messageEnd = useRef(null);
  var messageStart = useRef(null);
  var goToBottom = useRef(null);
  const isVisible = useIsVisible(messageStart);
  const isEndVisible = useIsVisible(messageEnd);

  var prevDate = '';

  const sendMessage = () => {
    if (!id) return;
    if (val.trim().length === 0) return;
    if (relation !== 'FRIENDS' && relation !== 'SELF') {
      toastService.info(`Cant send message to ${user.username}. Because ${user.username} is not your friend.`);
      setVal('');
      return;
    }
    publishMessage(id, val, false);
    setVal('');
  };

  const fetchUserData = async () => {
    try {
      const userRes = await userService.getUser(id);
      setUser(userRes.data.payload);

      const relationRes = await userService.getMyRelation(userId, id);
      setRelation(relationRes.data.payload.relation);
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  const clearMessages = () => {
    dispatch(setMessages([]));
  };

  useEffect(() => {
    if (isVisible) {
      fetchMessages(page);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isEndVisible) {
      goToBottom.current.classList.remove('bottom-0');
      goToBottom.current.classList.add('bottom-12');
    } else {
      goToBottom.current.classList.remove('bottom-12');
      goToBottom.current.classList.add('bottom-0');
    }
  });

  useEffect(() => {
    setPage(0);

    return () => {
      clearMessages();
    };
  }, []);

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, [val]);

  useEffect(() => {
    if (!userId) return;
    if (!id) return;
    setPage(0);
    fetchUserData();
    fetchMessages();
    messageEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [userId, id]);

  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!id) return;
    dispatch(descreaseCount(id));
  }, [inbox]);

  const fetchMessages = async (pageNumber = 0) => {
    try {
      const res = await chatService.fetchMessages(userId, id, pageNumber);
      if (res.data?.messages.content.length > 0) {
        if (pageNumber === 0) {
          dispatch(setMessages([...res.data.messages.content.reverse()]));
        } else {
          dispatch(setMessages([...res.data.messages.content.reverse(), ...messages]));
        }
        setPage(page + 1);
      }
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  return (
    <div className="flex w-full mx-5 mb-5 rounded-3xl flex-col h-chat bg-white  py-2 pl-5 overflow-hidden">
      <ProfileChat {...user} />
      <div className="grid grow overflow-y-scroll pt-2 pr-5">
        <div ref={messageStart} id="chat-top"></div>
        <div>
          {messages.map((message, i) => {
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
                <div key={i}>
                  <DateBreaker key={10000 + i} date={currDate} />
                  <Message {...message} userId={userId} />
                </div>
              );
            }
            return <Message key={i} {...message} userId={userId} />;
          })}
          <div ref={messageEnd} id="chat-bottom" className="h-2"></div>
        </div>
      </div>

      <div className="flex justify-center items-start flex-row mr-5 mb-3 gap-x-1">
        <div className="absolute">
          <div
            onClick={() => {
              messageEnd.current.scrollIntoView({ behavior: 'smooth' });
            }}
            ref={goToBottom}
            className="relative inline-block bottom-0 duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex bg-chatRecieverColor size-10 items-center justify-center rounded-full">
              <i className="fa-solid fa-arrow-down"></i>
            </div>
          </div>
        </div>
        <textarea
          alt="post-data"
          type="text"
          name="post-data"
          id="post-data"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          placeholder="type your message here"
          style={{ zIndex: '1' }}
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

    if ((currentDate.getTime() - last.getTime()) / (1000 * 60) <= 1) {
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
    } catch (error) {
      setLastSeenText(email);
    }
  }, [lastSeen]);
  return (
    <div className="grid gap-y-3 h-fit pr-5">
      <Link to={`/users/${userId}`} className="flex overflow-hidden items-center justify-center mr-5">
        <div to={`/users/${userId}`} className="h-circleImage w-circleImage">
          <ProfileImage id={profileImageId} />
        </div>
        <div className="text-gray-900 text-sm px-2.5">
          <p className="font-medium line-clamp-1">{username}</p>
          <div className="text-xs line-clamp-1">
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
  var textColor = chatAlignLeft ? 'text-black' : 'text-black';

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
  return (
    <span className={`px-5 py-1 rounded-2xl max-w-64 break-words ${bgColor} ${textColor}`}>
      <Linkify text={message} />
    </span>
  );
};

const PostMessage = ({ postId }) => {
  const [post, setPost] = useState({});
  const defaultErrorBehavior = useErrorBehavior();

  const fetchPost = async () => {
    try {
      const res = await postService.getPost(postId);
      setPost(res.data?.payload);
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Link
      to={`/posts/${postId}`}
      target="_blank"
      className="flex flex-col w-80 rounded-3xl overflow-hidden border bg-white"
    >
      <div className="grid bg-gray-50">
        <Link to={`/users/${post.userId}`} target="_blank" className="flex items-center justify-start p-3">
          <ProfileImage id={post.profileImageId} />
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
            src={post.imageId ? `${imageUrl}/${post.imageId}` : userIcon}
            alt="post"
            className="object-contain aspect-video"
          />
        </div>
      )}
    </Link>
  );
};

export default Chat;
