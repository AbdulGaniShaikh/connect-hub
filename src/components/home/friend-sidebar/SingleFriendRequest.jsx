import { Link } from 'react-router-dom';
import { check } from 'assets/icons';
import { friendService, toastService } from 'service';
import { HttpStatusCode } from 'axios';
import { useDispatch } from 'react-redux';
import { removeRequest } from './../../../redux/slices/friendRequestsSlice';
import useErrorBehavior from 'hooks/useErrorBehavior';
import ProfileImage from 'components/shared/ProfileImage';

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
    <div className="flex w-full p-2 hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer rounded-md">
      <div className="flex overflow-hidden items-center">
        <Link to={`/users/${userId}`} className="h-circleImage w-circleImage">
          <ProfileImage id={profileImageId} height="full" width="full" />
        </Link>

        <Link to={`/users/${userId}`} className=" flex-1 text-sm px-2.5 overflow-hidden">
          <p className="font-medium line-clamp-1">{username}</p>
          <p className="font-thin text-xs line-clamp-1">{email}</p>
        </Link>
        <div className="flex-none flex justify-center items-center p-1 rounded-md bg-green-400 hover:bg-green-500">
          <i onClick={acceptRequest} className="fa-solid fa-check text-xl size-5 text-center"></i>
        </div>
      </div>
    </div>
  );
};

export default SingleFriendRequest;
