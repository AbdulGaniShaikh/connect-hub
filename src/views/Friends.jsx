import { useEffect, useState } from 'react';
import NoData from 'components/shared/NoData';
import { Link, useParams } from 'react-router-dom';
import { friendService, toastService } from 'service';
import { useDispatch, useSelector } from 'react-redux';
import { decrementTotalFriendsCount, selectUserInfo } from './../redux/slices/userInfoSlice';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { Pagination } from '@mui/material';
import useErrorBehavior from 'hooks/useErrorBehavior';
import ProfileImage from 'components/shared/ProfileImage';
import BackButton from 'components/buttons/BackButton';
import { flipFlag } from './../redux/slices/friendRequestsSlice';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const { id } = useParams();
  const [page, setPage] = useState({ pageNumber: 1, totalPages: 0 });
  const [pageFlag, setPageFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector(selectUserInfo);
  const [showMessageButtons, setShowButtons] = useState(false);
  const defaultErrorBehavior = useErrorBehavior();
  const dispatch = useDispatch();

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
  }, [userId, id, pageFlag]);

  const onUnfriend = (id) => {
    setFriends(friends.filter((user) => user.userId !== id));
    dispatch(decrementTotalFriendsCount());
    dispatch(flipFlag());
  };

  return (
    <div className="h-full w-full grid grid-flow-row p-5 gap-5">
      <div>
        <div className="font-medium pb-2">
          <BackButton />
          Friends
        </div>
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
        <div className="flex flex-col justify-center items-center">
          <Pagination
            count={page.totalPages}
            variant="outlined"
            shape="rounded"
            size="large"
            page={page.pageNumber}
            onChange={(_, i) => {
              setPage({ ...page, pageNumber: i });
              setPageFlag(!pageFlag);
            }}
          />
        </div>
      )}
    </div>
  );
};

const Friend = (props) => {
  const { profileImageId, username, email, userId, visitorId, showMessageButtons, onUnfriend } = props;
  const defaultErrorBehavior = useErrorBehavior();

  const onUnfriendClick = async () => {
    try {
      await friendService.unfriend(visitorId, userId);
      onUnfriend(userId);
      toastService.success(`Unfriended ${username}`);
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  return (
    <div className="w-full p-2 hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer rounded-md">
      <div className="flex overflow-hidden items-center">
        <Link to={`/users/${userId}`} className="h-circleImage w-circleImage">
          <ProfileImage id={profileImageId} />
        </Link>
        <Link to={`/users/${userId}`} className="flex-1 text-sm px-2.5 overflow-hidden">
          <p className="font-medium line-clamp-1">{username}</p>
          <p className="font-thin text-xs line-clamp-1">{email}</p>
        </Link>
        {showMessageButtons && (
          <div className="flex gap-x-2 items-center justify-center">
            <Link to={`/inbox/${userId}`}>
              <i className="fa-regular fa-message fa-lg p-1 rounded-md"></i>
            </Link>
            <div
              onClick={onUnfriendClick}
              className="flex-none flex justify-center items-center p-1 rounded-md bg-red-400 hover:bg-red-500"
            >
              <i className="fa-solid fa-xmark text-xl size-5 text-center"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
