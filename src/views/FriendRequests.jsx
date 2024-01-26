import accept from './../assets/icons/check.svg';
import decline from './../assets/icons/close.svg';
import NoData from 'components/shared/NoData';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeRequest, selectRequests } from './../redux/slices/friendRequestsSlice';

const FriendRequests = () => {
  const friends = useSelector(selectRequests);
  const dispatch = useDispatch();

  const onDecline = (id) => {
    dispatch(removeRequest(id));
    console.log('friend request declined');
  };
  const onAccept = (id) => {
    dispatch(removeRequest(id));
    console.log('friend request accepted');
  };

  return (
    <div className="px-5 h-full w-full pb-5 grid grid-flow-row">
      <div className="bg-white rounded-3xl h-full w-full p-5">
        <p className="font-medium pb-2">Friend Request</p>
        {friends.length <= 0 ? (
          <NoData message="You don't have any friends requests" />
        ) : (
          friends.map((data) => {
            return <FriendRequest {...data} onDecline={onDecline} onAccept={onAccept} />;
          })
        )}
      </div>
    </div>
  );
};

const FriendRequest = (props) => {
  const { profile, username, email, id, onDecline, onAccept } = props;
  const navigate = useNavigate();
  const onUserClick = () => {
    navigate(`/users/${id}`);
  };
  const onDeclineClick = () => {
    onDecline(id);
  };
  const onAcceptClick = () => {
    onAccept(id);
  };
  return (
    <div className="w-full p-2 hover:bg-gray-100 *:cursor-pointer rounded-md">
      <div className="flex overflow-hidden items-center">
        <img
          onClick={onUserClick}
          src={profile ? profile : 'logo.svg'}
          alt={id}
          className="rounded-full h-circleImage w-circleImage"
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
