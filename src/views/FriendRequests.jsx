import NoData from 'components/shared/NoData';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeRequest } from './../redux/slices/friendRequestsSlice';
import { useEffect, useState } from 'react';
import { friendService, toastService } from 'service';
import {
  decrementTotalFriendsCount,
  incrementTotalFriendsCount,
  selectUserInfo
} from './../redux/slices/userInfoSlice';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { HttpStatusCode } from 'axios';
import { Pagination } from '@mui/material';
import useErrorBehavior from 'hooks/useErrorBehavior';
import ProfileImage from 'components/shared/ProfileImage';
import BackButton from 'components/buttons/BackButton';

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ pageNumber: 1, totalPages: 0 });
  const [pageFlag, setPageFlag] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useSelector(selectUserInfo);
  const defaultErrorBehavior = useErrorBehavior();

  const onDecline = async (friendRequestId, username) => {
    try {
      var res = await friendService.rejectFriendRequest(friendRequestId);
      if (res.status === HttpStatusCode.Ok) {
        toastService.success(`Rejected ${username}'s friend request`);
        dispatch(removeRequest(friendRequestId));
        setFriendRequests(friendRequests.filter((request) => friendRequestId !== request.friendRequestId));
        fetchFriendRequest();
      }
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };
  const onAccept = async (friendRequestId, username) => {
    try {
      var res = await friendService.acceptFriendRequest(friendRequestId);
      if (res.status === HttpStatusCode.Ok) {
        toastService.success(`Accepted ${username}'s friend request`);
        dispatch(removeRequest(friendRequestId));
        dispatch(incrementTotalFriendsCount());
        setFriendRequests(friendRequests.filter((request) => friendRequestId !== request.friendRequestId));
        fetchFriendRequest();
      }
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchFriendRequest();
  }, [userId, pageFlag]);

  const fetchFriendRequest = async () => {
    try {
      const res = await friendService.getFriendRequests(userId, Math.max(0, page.pageNumber - 1));
      setFriendRequests(res.data?.content);
      var { totalPages } = res.data;
      if (page.totalPages !== totalPages) setPage({ ...page, totalPages });
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full grid grid-flow-row p-5 gap-y-5">
      <div>
        <div className="font-medium pb-2">
          <BackButton />
          Friend Request
        </div>
        {loading &&
          Array(5)
            .fill(1)
            .map((_, i) => <UserCardSkeleton key={i} />)}
        {!loading && friendRequests.length === 0 && <NoData message="You don't have any friends requests" />}
        {!loading &&
          friendRequests.map((data) => {
            return <FriendRequest key={data.userId} {...data} onDecline={onDecline} onAccept={onAccept} />;
          })}
      </div>
      {!loading && friendRequests.length !== 0 && (
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

const FriendRequest = (props) => {
  const { profileImageId, username, email, userId, onDecline, onAccept, friendRequestId } = props;
  const onDeclineClick = () => {
    onDecline(friendRequestId, username);
  };
  const onAcceptClick = () => {
    onAccept(friendRequestId, username);
  };
  return (
    <div className="w-full p-2 hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer rounded-md">
      <div className="flex overflow-hidden items-center">
        <Link to={`/users/${userId}`}>
          <ProfileImage id={profileImageId} />
        </Link>
        <Link to={`/users/${userId}`} className=" flex-1 text-sm px-2.5 overflow-hidden">
          <p className="font-medium line-clamp-1">{username}</p>
          <p className="font-thin text-xs line-clamp-1">{email}</p>
        </Link>
        <div className="flex gap-x-2">
          <div
            onClick={onDeclineClick}
            className="flex-none flex justify-center items-center p-1 rounded-md bg-red-400 hover:bg-red-500"
          >
            <i className="fa-solid fa-xmark text-xl size-5 text-center"></i>
          </div>
          <div
            onClick={onAcceptClick}
            className="flex-none flex justify-center items-center p-1 rounded-md bg-green-400 hover:bg-green-500"
          >
            <i className="fa-solid fa-check text-xl size-5 text-center"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
