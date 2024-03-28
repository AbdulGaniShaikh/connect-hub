import accept from 'assets/icons/check.svg';
import decline from 'assets/icons/close.svg';
import NoData from 'components/shared/NoData';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeRequest } from './../redux/slices/friendRequestsSlice';
import { imageUrl } from 'global';
import { user } from 'assets/icons';
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

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ pageNumber: 1, totalPages: 0 });
  const dispatch = useDispatch();
  const { userId } = useSelector(selectUserInfo);
  const defaultErrorBehavior = useErrorBehavior();

  const onDecline = async (friendRequestId, username) => {
    try {
      var res = await friendService.rejectFriendRequest(friendRequestId);
      if (res.status === HttpStatusCode.Ok) {
        toastService.success(`Rejected ${username}'s friend request`);
        dispatch(removeRequest(friendRequestId));
        dispatch(decrementTotalFriendsCount());
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
  }, [userId, page]);

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
    <div className="px-5 h-full w-full pb-5 grid grid-flow-row">
      <div className="bg-white rounded-3xl h-full w-full p-5">
        <p className="font-medium pb-2">Friend Request</p>
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

const FriendRequest = (props) => {
  const { profileImageId, username, email, userId, onDecline, onAccept, friendRequestId } = props;
  const onDeclineClick = () => {
    onDecline(friendRequestId, username);
  };
  const onAcceptClick = () => {
    onAccept(friendRequestId, username);
  };
  return (
    <div className="w-full p-2 hover:bg-gray-100 *:cursor-pointer rounded-md">
      <div className="flex overflow-hidden items-center">
        <Link to={`/users/${userId}`}>
          <ProfileImage id={profileImageId} />
        </Link>
        <Link to={`/users/${userId}`} className=" text-gray-900 flex-1 text-sm px-2.5 overflow-hidden">
          <p className="font-medium line-clamp-1">{username}</p>
          <p className="font-thin text-xs line-clamp-1">{email}</p>
        </Link>
        <div className="flex gap-x-2">
          <div
            onClick={onDeclineClick}
            className="flex-none flex justify-center items-center p-1 rounded-md bg-red-400 hover:bg-red-500"
          >
            <img src={decline} alt="" className="size-5 " />
          </div>
          <div
            onClick={onAcceptClick}
            className="flex-none flex justify-center items-center p-1 rounded-md bg-green-400 hover:bg-green-500"
          >
            <img src={accept} alt="" className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
