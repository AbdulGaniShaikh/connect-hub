import NoData from 'components/shared/NoData';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from './../redux/slices/userInfoSlice';
import { selectInbox, setInbox, updateInbox } from './../redux/slices/messageSlice';
import { imageUrl } from 'global';
import { user } from 'assets/icons';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { Link } from 'react-router-dom';
import useErrorBehavior from 'hooks/useErrorBehavior';
import chatService from 'service/chatService';
import { userService } from 'service';
import ProfileImage from 'components/shared/ProfileImage';

const Inbox = () => {
  const { userId } = useSelector(selectUserInfo);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const inbox = useSelector(selectInbox);
  const dispatch = useDispatch();
  const defaultErrorBehavior = useErrorBehavior();

  useEffect(() => {
    setPage(0);
  }, []);

  const fetchInbox = async () => {
    setLoading(true);
    try {
      const res = await chatService.fetchInbox(userId, page);
      if (!res.data.empty) {
        dispatch(setInbox([...res.data.content]));
        setPage(page + 1);
      }
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchInbox();
  }, [userId]);

  return (
    <div className="h-full w-full grid grid-flow-row p-5 gap-y-5">
      <div>
        <p className="font-medium pb-2">Messages</p>
        {loading &&
          Array(5)
            .fill(1)
            .map((_, i) => <UserCardSkeleton key={i} />)}
        {!loading && inbox.length === 0 && <NoData message="You don't have any inbox" />}
        {!loading &&
          inbox.map((data, i) => {
            return <InboxItem key={i} {...data} />;
          })}
        <div
          onClick={() => {
            fetchInbox();
          }}
          className="text-center cursor-pointer select-none mt-5"
        >
          Show more
        </div>
      </div>
    </div>
  );
};

const InboxItem = (props) => {
  const { profileImageId, username, email, userId, lastSeen, lastMessage, post, unreadMessageCount, senderId } = props;
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  var subtitle = post ? 'Sent a post' : lastMessage;
  subtitle = userId === senderId ? subtitle : 'You: ' + subtitle;

  if (!username) {
    userService
      .getUser(userId)
      .then((res) => {
        const user = res.data.payload;
        dispatch(updateInbox(user));
      })
      .catch(() => {});
  }

  useEffect(() => {
    var last = new Date(lastSeen);
    var currentDate = new Date();
    if ((currentDate.getTime() - last.getTime()) / (1000 * 60) <= 1) {
      setIsActive(true);
      return;
    }
  }, [lastSeen]);

  return (
    <div className="w-full p-2 hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer rounded-md">
      <Link to={`/inbox/${userId}`} className="flex overflow-hidden items-center">
        <div
          className={`${
            isActive && 'outline outline-2 outline-offset-2 outline-green-500'
          } m-1 relative rounded-full aspect-square object-cover h-circleImage w-circleImage`}
        >
          <ProfileImage id={profileImageId} />
          {isActive && <p className="absolute h-3 w-3 rounded-full bg-green-500 -right-px -bottom-px"></p>}
        </div>

        <div className="flex-1 text-sm px-2.5 ">
          <p className="font-medium line-clamp-1">{username}</p>
          <div className={`text-xs line-clamp-1 ${unreadMessageCount > 0 && 'font-bold'}`}>
            <p className="">{subtitle}</p>
          </div>
        </div>
        {unreadMessageCount > 0 && (
          <p className="text-center   p-px size-5 rounded-full bg-primaryColor text-xs">{unreadMessageCount}</p>
        )}
      </Link>
    </div>
  );
};

export default Inbox;
