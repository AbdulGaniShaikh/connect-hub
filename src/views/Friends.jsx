import { useEffect, useState } from 'react';
import message from 'assets/icons/send.svg';
import remove from 'assets/icons/user-remove.svg';
import NoData from 'components/shared/NoData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { friendService, toastService } from 'service';
import { useDispatch, useSelector } from 'react-redux';
import { decrementTotalFriendsCount, selectUserInfo } from './../redux/slices/userInfoSlice';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { imageUrl } from 'global';
import { user } from 'assets/icons';
import { Pagination } from '@mui/material';
import useErrorBehavior from 'hooks/useErrorBehavior';
import ProfileImage from 'components/shared/ProfileImage';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const { id } = useParams();
  const [page, setPage] = useState({ pageNumber: 1, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector(selectUserInfo);
  const [showMessageButtons, setShowButtons] = useState(false);
  const defaultErrorBehavior = useErrorBehavior();

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const res = await friendService.getFriends(id, Math.max(0, page.pageNumber - 1));

      setFriends(res.data.content);
      var { totalPages } = res.data;
      if (page.totalPages !== totalPages) setPage({ ...page, totalPages });
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!userId) return;
    if (userId === id) setShowButtons(true);
    fetchFriends();
  }, [userId, id, page]);

  const onUnfriend = (id) => {
    setFriends(friends.filter((user) => user.userId !== id));
  };

  return (
    <div className="px-5 h-full w-full pb-5 grid grid-flow-row">
      <div className="bg-white rounded-3xl h-full w-full p-5">
        <p className="font-medium pb-2">Friends</p>
        {loading &&
          Array(5)
            .fill(1)
            .map((_, i) => <UserCardSkeleton key={i} />)}
        {!loading && friends.length === 0 && <NoData message="You don't have any friends" />}
        {!loading &&
          friends.map((friend, id) => {
            return (
              <Friend
                key={id}
                {...friend}
                visitorId={userId}
                showMessageButtons={showMessageButtons}
                onUnfriend={onUnfriend}
              />
            );
          })}
      </div>
      {!loading && friends.length !== 0 && (
        <div className="flex flex-col justify-center items-center pt-5">
          <Pagination
            count={page.totalPages}
            variant="outlined"
            shape="rounded"
            size="large"
            page={page.pageNumber}
            onChange={(_, i) => {
              setPage({ ...page, pageNumber: i });
            }}
          />
        </div>
      )}
    </div>
  );
};

const Friend = (props) => {
  const { profileImageId, username, email, userId, visitorId, showMessageButtons, onUnfriend } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultErrorBehavior = useErrorBehavior();

  const onUnfriendClick = async () => {
    try {
      await friendService.unfriend(visitorId, userId);
      onUnfriend(userId);
      toastService.success(`Unfriended ${username}`);
      dispatch(decrementTotalFriendsCount());
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };
  const messageUser = () => {
    navigate(`/inbox/${userId}`);
  };
  return (
    <div className="w-full p-2 hover:bg-gray-100 *:cursor-pointer rounded-md">
      <div className="flex overflow-hidden items-center">
        <Link to={`/users/${userId}`} className="h-circleImage w-circleImage">
          <ProfileImage id={profileImageId} />
        </Link>
        <Link to={`/users/${userId}`} className=" text-gray-900 flex-1 text-sm px-2.5 overflow-hidden">
          <p className="font-medium line-clamp-1">{username}</p>
          <p className="font-thin text-xs line-clamp-1">{email}</p>
        </Link>
        {showMessageButtons && (
          <div className="flex gap-x-2">
            <div
              onClick={messageUser}
              className="flex-none flex justify-center items-center p-1 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              <img src={message} alt="" className="size-5" />
            </div>
            <div
              onClick={onUnfriendClick}
              className="flex-none flex justify-center items-center p-1 rounded-md bg-red-400 hover:bg-red-500"
            >
              <img src={remove} alt="" className="size-5 " />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
