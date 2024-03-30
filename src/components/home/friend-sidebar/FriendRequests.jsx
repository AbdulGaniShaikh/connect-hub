import SingleFriendRequest from 'components/home/friend-sidebar/SingleFriendRequest';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectRequests, setRequests } from './../../../redux/slices/friendRequestsSlice';
import { selectUserInfo } from './../../../redux/slices/userInfoSlice';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { useEffect, useState } from 'react';
import { friendService } from 'service';
import useErrorBehavior from 'hooks/useErrorBehavior';
import Divider from 'components/shared/Divider';

const FriendRequests = () => {
  const friendReqs = useSelector(selectRequests);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector(selectUserInfo);
  const defaultErrorBehavior = useErrorBehavior();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await friendService.getFriendRequests(userId, 0, 3);
      dispatch(setRequests(res.data?.content));
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchRequests();
  }, [userId]);

  const onViewAllFRClick = () => {
    navigate('/friend-requests');
  };

  return (
    <div>
      <div className="grid gap-y-3 flow-row    p-5">
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
        <p onClick={onViewAllFRClick} className="place-self-center text-primaryColor font-medium cursor-pointer">
          View all requests
        </p>
      </div>
    </div>
  );
};

export default FriendRequests;
