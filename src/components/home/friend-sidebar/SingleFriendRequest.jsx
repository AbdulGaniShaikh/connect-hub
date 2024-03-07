import { Link } from 'react-router-dom';
import { check, user } from 'assets/icons';
import { imageUrl } from 'global';
import { friendService, toastService } from 'service';
import { HttpStatusCode } from 'axios';
import { useDispatch } from 'react-redux';
import { removeRequest } from './../../../redux/slices/friendRequestsSlice';
import useErrorBehavior from 'hooks/useErrorBehavior';

const SingleFriendRequest = (props) => {
  var { username, email, userId, friendRequestId, profileImageId } = props;
  const dispatch = useDispatch();
  const defaultErrorBehavior = useErrorBehavior();

  const acceptRequest = async () => {
    try {
      const res = await friendService.acceptFriendRequest(friendRequestId);
      if (res.status === HttpStatusCode.Ok) {
        toastService.success('accepted friend request');
        dispatch(removeRequest(friendRequestId));
      }
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };
  return (
    <div className="flex w-full p-2 hover:bg-gray-100 *:cursor-pointer rounded-md">
      <div className="flex overflow-hidden items-center">
        <Link
          to={`/users/${userId}`}
          className="flex justify-center items-center rounded-full h-circleImage w-circleImage overflow-hidden"
        >
          <img
            src={profileImageId ? `${imageUrl}/${profileImageId}` : user}
            alt=""
            className="w-full h-full aspect-square object-cover bg-gray-100"
          />
        </Link>

        <Link to={`/users/${userId}`} className="text-gray-900 grow text-sm px-2.5 overflow-hidden">
          <p className="font-medium overflow-ellipsis overflow-hidden ">{username ? username : 'username'}</p>
          <p className="font-thin text-xs overflow-ellipsis overflow-hidden">{email ? email : 'email'}</p>
        </Link>
        <div
          onClick={acceptRequest}
          className="flex-none flex justify-center items-center p-1 rounded-md bg-green-400 hover:bg-green-500"
        >
          <img src={check} alt="" className="size-5 " />
        </div>
      </div>
    </div>
  );
};

export default SingleFriendRequest;
