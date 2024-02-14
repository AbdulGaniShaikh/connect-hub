import accept from 'assets/icons/check.svg';
import decline from 'assets/icons/close.svg';
import NoData from 'components/shared/NoData';
import { useNavigate } from 'react-router-dom';
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

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ pageNumber: 1, totalPages: 0 });
  const dispatch = useDispatch();
  const { userId } = useSelector(selectUserInfo);

  const onDecline = async (id, username) => {
    try {
      var res = await friendService.rejectFriendRequest(id, userId);
      if (res.status === HttpStatusCode.Ok) {
        toastService.success(`Rejected ${username}'s friend request`);
        dispatch(removeRequest(id));
        dispatch(decrementTotalFriendsCount());
        setFriendRequests(friendRequests.filter((request) => id !== request.userId));
        fetchFriendRequest();
      }
    } catch (error) {}
  };
  const onAccept = async (id, username) => {
    try {
      var res = await friendService.acceptFriendRequest(id, userId);
      if (res.status === HttpStatusCode.Ok) {
        toastService.success(`Accepted ${username}'s friend request`);
        dispatch(removeRequest(id));
        dispatch(incrementTotalFriendsCount());
        setFriendRequests(friendRequests.filter((request) => id !== request.userId));
        fetchFriendRequest();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchFriendRequest();
  }, [userId, page]);

  const fetchFriendRequest = () => {
    friendService
      .getFriendRequests(userId, page.pageNumber - 1)
      .then((res) => {
        setFriendRequests(res.data?.content);
        var { totalPages } = res.data;
        if (page.totalPages !== totalPages) setPage({ ...page, totalPages });
      })
      .catch((error) => {
        toastService.error(error.response.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
        {friendRequests.map((data) => {
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
  const { profileImageId, username, email, userId, onDecline, onAccept } = props;
  const navigate = useNavigate();

  const onUserClick = () => {
    navigate(`/users/${userId}`);
  };
  const onDeclineClick = () => {
    onDecline(userId, username);
  };
  const onAcceptClick = () => {
    onAccept(userId, username);
  };
  return (
    <div className="w-full p-2 hover:bg-gray-100 *:cursor-pointer rounded-md">
      <div className="flex overflow-hidden items-center">
        <img
          onClick={onUserClick}
          src={profileImageId ? `${imageUrl}/${profileImageId}` : user}
          alt={userId}
          className="rounded-full h-circleImage w-circleImage aspect-square object-cover"
        />
        <div onClick={onUserClick} className=" text-gray-900 grow text-sm px-2.5 overflow-hidden">
          <p className="font-medium overflow-ellipsis overflow-hidden ">{username ? username : 'username'}</p>
          <p className="font-thin text-xs overflow-ellipsis overflow-hidden">{email ? email : 'email'}</p>
        </div>
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
