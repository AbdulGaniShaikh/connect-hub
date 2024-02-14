import SingleFriendRequest from './SingleFriendRequest';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeRequest, selectRequests, setRequests } from './../../../redux/slices/friendRequestsSlice';
import UserCardSkeleton from './../../skeletons/UserCardSkeleton';
import { useEffect, useState } from 'react';
import { friendService, toastService } from 'service';
import { selectUserInfo } from './../../../redux/slices/userInfoSlice';
import { HttpStatusCode } from 'axios';

const FriendRequests = () => {
  const friendReqs = useSelector(selectRequests);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector(selectUserInfo);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    friendService
      .getFriendRequests(userId, 0, 3)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          dispatch(setRequests(res.data?.content));
        }
      })
      .catch((error) => {
        toastService.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const onViewAllFRClick = () => {
    navigate('/friend-requests');
  };

  return (
    <div>
      <div className="grid gap-y-3 flow-row bg-white rounded-3xl p-5">
        <p className="font-medium">Friend Requests</p>
        <div className="w-full">
          {friendReqs.map((req) => <SingleFriendRequest loggedInId={userId} key={req.userId} {...req} />).slice(0, 2)}
          {loading && (
            <>
              <UserCardSkeleton />
              <UserCardSkeleton />
            </>
          )}
          {!loading && friendReqs.length === 0 && <div className="text-sm">You have no friend request</div>}
        </div>
        <hr />
        <p onClick={onViewAllFRClick} className="place-self-center text-primaryColor font-medium cursor-pointer">
          View all requests
        </p>
      </div>
    </div>
  );
};

export default FriendRequests;
