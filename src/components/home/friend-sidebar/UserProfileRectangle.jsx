import { Link } from 'react-router-dom/dist';
import ProfileImage from 'components/shared/ProfileImage';

const UserProfileRectangle = (props) => {
  const { username, email, profileImageId, userId } = props;
  return (
    <Link
      to={`/users/${userId}`}
      className="flex justify-start items-center w-full p-2 rounded-md overflow-hidden cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover"
    >
      <div className="h-circleImage w-circleImage aspect-square">
        <ProfileImage id={profileImageId} width="full" height="full" />
      </div>
      <div className="flex-1 focus:outline-none text-sm px-2.5">
        <p className="font-medium line-clamp-1">{username}</p>
        <p className="font-thin text-xs line-clamp-1">{email}</p>
      </div>
    </Link>
  );
};

export default UserProfileRectangle;
