import profilePlaceholder from './../../../assets/profile.jpg';
import { Link } from 'react-router-dom/dist';

const UserProfileRectangle = (props) => {
  const { username, email, profile, userId } = props;
  return (
    <Link
      to={`/users/${userId}`}
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
    </Link>
  );
};

export default UserProfileRectangle;
