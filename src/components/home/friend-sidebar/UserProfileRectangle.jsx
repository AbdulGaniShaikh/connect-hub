import { useNavigate } from 'react-router-dom';
import profilePlaceholder from './../../../assets/profile.jpg';

const UserProfileRectangle = (props) => {
  const { username, email, profile, userId } = props;
  const navigate = useNavigate();
  const onClick = () => navigate(`/users/${userId}`);
  return (
    <div
      onClick={onClick}
      className="flex justify-start items-center w-full p-2 rounded-md overflow-hidden cursor-pointer hover:bg-gray-100"
    >
      <img
        src={profile ? profile : profilePlaceholder}
        alt=""
        className="w-circleImage h-circleImage rounded-full bg-gray-100 object-cover"
      />
      <div className="text-gray-900 focus:outline-none w-full text-sm px-2.5">
        <p className="font-medium overflow-ellipsis overflow-hidden w-40">{username}</p>
        <p className="font-thin text-xs overflow-ellipsis overflow-hidden w-40">{email}</p>
      </div>
    </div>
  );
};

export default UserProfileRectangle;
