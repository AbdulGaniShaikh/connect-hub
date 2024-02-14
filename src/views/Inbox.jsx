import NoData from 'components/shared/NoData';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../redux/slices/userInfoSlice';
import { friendService, toastService } from 'service';
import { HttpStatusCode } from 'axios';
import { imageUrl } from 'global';
import { user } from 'assets/icons';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { Link } from 'react-router-dom';

const Inbox = (props) => {
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const { userId } = useSelector(selectUserInfo);

  useEffect(() => {
    setPage(0);
  }, []);

  const fetchInbox = () => {
    setLoading(true);
    friendService
      .getFriends(userId, page)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          if (res.data?.content.length > 0) {
            setFriends([...res.data.content, ...friends]);
            setPage(page + 1);
          }
        }
      })
      .catch((error) => {
        toastService.error(error.response.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!userId) return;
    fetchInbox();
  }, [userId]);

  return (
    <div className="px-5 w-full pb-5 grid grid-flow-row gap-y-5">
      <div className="h-full w-full rounded-3xl p-5 bg-white">
        <p className="font-medium pb-2">Messages</p>
        {loading &&
          Array(5)
            .fill(1)
            .map((_, i) => <UserCardSkeleton key={i} />)}
        {!loading && friends.length === 0 && <NoData message="You don't have any friends" />}
        {friends.map((data) => {
          return <InboxItem {...data} />;
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
  const { profileImageId, username, email, userId, lastSeen } = props;
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
    <div className="w-full p-2 hover:bg-gray-100 *:cursor-pointer rounded-md">
      <Link to={`/inbox/${userId}`} className="flex overflow-hidden items-center">
        <img
          src={profileImageId ? `${imageUrl}/${profileImageId}` : user}
          alt={userId}
          className="rounded-full aspect-square object-cover h-circleImage w-circleImage"
        />
        <div className="text-gray-900 grow text-sm px-2.5 overflow-hidden">
          <p className="font-medium overflow-ellipsis overflow-hidden ">{username}</p>
          {/* <div className="text-xs overflow-ellipsis overflow-hidden">{lastSeenText}</div> */}
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
        {/* {isActive && <p className="rounded-full bg-green-500 p-1 h-2 w-2"></p>} */}
      </Link>
    </div>
  );
};

export default Inbox;
