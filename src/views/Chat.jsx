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
import Divider from 'components/shared/Divider';

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
    <div className="flex w-full flex-col h-chat py-2 pl-5 overflow-hidden">
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

      <div className="flex justify-center items-end flex-row pr-5 gap-x-1">
        <div className="absolute">
          <div
            onClick={() => {
              messageEnd.current.scrollIntoView({ behavior: 'smooth' });
            }}
            ref={goToBottom}
            className="relative inline-block bottom-0 duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex bg-chatRecieverColor size-10 items-center justify-center rounded-full">
              <i className="fa-solid fa-arrow-down text-colorOnLight"></i>
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
          className="focus:outline-none rounded-md w-full text-sm p-2.5 resize-none bg-lightHover dark:bg-darkHover"
          ref={textAreaRef}
        ></textarea>
        <div onClick={() => sendMessage()} className="pl-2.5 py-3">
          <i className="fa-regular fa-paper-plane fa-lg cursor-pointer"></i>
        </div>
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
        <div className="px-2.5">
          <p className="font-bold line-clamp-1">{username}</p>
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
      <Divider />
    </div>
  );
};

const DateBreaker = ({ date }) => {
  return (
    <div className="grid my-8 grid-cols-5 items-center">
      <Divider className="grow" />
      <Divider className="grow" />
      <p className="grow-0 justify-self-center text-xs">{date}</p>
      <Divider className="grow" />
      <Divider className="grow" />
    </div>
  );
};

const Message = (props) => {
  const { message, senderId, userId, post, date } = props;
  var chatAlignLeft = senderId !== userId;
  var bgColor = chatAlignLeft ? 'bg-gray-100' : 'bg-chatRecieverColor';
  var textColor = chatAlignLeft ? 'text-black' : 'text-black';
  // var textColor = chatAlignLeft ? '' : '';

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
      className="flex flex-col w-80 rounded-2xl border-lightHover dark:border-darkHover overflow-hidden border  "
    >
      <div className="grid bg-lightHover dark:bg-darkHover ">
        <Link to={`/users/${post.userId}`} target="_blank" className="flex items-center justify-start p-3">
          <ProfileImage id={post.profileImageId} />
          <div className="text-sm px-2.5 overflow-hidden">
            <p className="font-medium overflow-ellipsis overflow-hidden ">{post.username}</p>
          </div>
        </Link>
      </div>
      {post.text && <div className="p-3">{post.text}</div>}
      {post.imageId && (
        <div className="flex justify-center items-start center bg-gray-100 overflow-hidden">
          <img
            src={post.imageId ? `${imageUrl}/${post.imageId}` : userIcon}
            alt="post"
            className="object-cover w-full max-h-80"
          />
        </div>
      )}
    </Link>
  );
};

export default Chat;
