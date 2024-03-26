import { Link } from 'react-router-dom/dist';
import ProfileImage from 'components/shared/ProfileImage';

const UserProfileRectangle = (props) => {
  const { username, email, profileImageId, userId } = props;
  return (
    <Link
      to={`/users/${userId}`}
      className="flex justify-start items-center w-full p-2 rounded-md overflow-hidden cursor-pointer hover:bg-gray-100"
    >
      <ProfileImage id={profileImageId} />
      <div className="text-gray-900 shrink focus:outline-none text-sm px-2.5">
        <p className="font-medium overflow-ellipsis overflow-hidden w-40">{username}</p>
        <p className="font-thin text-xs overflow-ellipsis overflow-hidden w-40">{email}</p>
      </div>
    </Link>
  );
};

export default UserProfileRectangle;
