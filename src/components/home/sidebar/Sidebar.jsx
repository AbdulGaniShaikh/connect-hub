import { Link } from 'react-router-dom';
import { selectUserInfo } from './../../../redux/slices/userInfoSlice';
import { useSelector } from 'react-redux';
import ProfileImage from 'components/shared/ProfileImage';
const Sidebar = (props) => {
  const { className } = props;
  const user = useSelector(selectUserInfo);

  return (
    <aside id="logo-sidebar" className={'fixed w-64 h-screen ' + className}>
      <div className="flex flex-col gap-y-3 overflow-hidden select-none p-5 text-center items-center">
        <Link to="/profile" className="block size-24 rounded-full">
          <ProfileImage id={user.profileImageId} height="full" width="full" />
        </Link>
        <Link to="/profile">
          <p className="font-medium text-md">{user.username ? user.username : ''}</p>
          <p className="text-sm">{user.email ? user.email : ''}</p>
        </Link>
        <div>
          <p className="font-medium text-md">Total Friends</p>
          <p className="text-sm">{user.totalFriends ? user.totalFriends : 0}</p>
        </div>
        <div>
          <p className="font-medium text-md">Total posts</p>
          <p className="text-sm">{user.totalPost ? user.totalPost : 0}</p>
        </div>
        <Link to="/profile" className="text-primaryColor font-medium">
          View my profile
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
