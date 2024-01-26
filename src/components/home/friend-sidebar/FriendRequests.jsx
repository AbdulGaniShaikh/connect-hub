import SingleFriendRequest from './SingleFriendRequest';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeRequest, selectRequests } from './../../../redux/slices/friendRequestsSlice';

const FriendRequests = () => {
  const friendReqs = useSelector(selectRequests);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDecline = (id) => {
    dispatch(removeRequest(id));
  };

  const renderFriendRequests = () => {
    return friendReqs.map((req) => <SingleFriendRequest {...req} onClick={onDecline} />).slice(0, 2);
  };

  const onViewAllFRClick = () => {
    navigate('/friend-requests');
  };

  return (
    <div>
      <div className="grid gap-y-3 flow-row bg-white rounded-3xl p-5">
        <p className="font-medium">Friend Requests</p>
        <div className="w-full">
          {friendReqs.length <= 0 ? <div className="text-sm">You have no friend request</div> : renderFriendRequests()}
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
