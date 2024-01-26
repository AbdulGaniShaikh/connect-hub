import { useNavigate } from 'react-router-dom';
import accept from './../../../assets/icons/check.svg';

const SingleFriendRequest = (props) => {
  var { username, email, id, profile, onClick } = props;
  profile = 'https://api.multiavatar.com/Binx%20Bond.png';
  const navigate = useNavigate();
  const onUserClick = () => {
    navigate(`/users/${id}`);
  };
  const acceptRequest = () => {
    onClick(id);
  };
  return (
    <div className="w-full p-2 hover:bg-gray-100 *:cursor-pointer rounded-md">
      <div className="flex overflow-hidden items-center">
        <img
          onClick={onUserClick}
          src={profile ? profile : 'logo512.png'}
          alt=""
          className="rounded-full h-circleImage w-circleImage"
        />
        <div onClick={onUserClick} className="text-gray-900 grow text-sm px-2.5 overflow-hidden">
          <p className="font-medium overflow-ellipsis overflow-hidden ">{username ? username : 'username'}</p>
          <p className="font-thin text-xs overflow-ellipsis overflow-hidden">{email ? email : 'email'}</p>
        </div>
        <div
          onClick={acceptRequest}
          className="flex-none flex justify-center items-center p-1 rounded-md bg-green-400 hover:bg-green-500"
        >
          <img src={accept} alt="" className="size-5 " />
        </div>
      </div>
    </div>
  );
};

export default SingleFriendRequest;
