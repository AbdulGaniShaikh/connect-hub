import { Link } from 'react-router-dom';
import { selectUserInfo } from './../../../redux/slices/userInfoSlice';
import { useSelector } from 'react-redux';
import ProfileImage from 'components/shared/ProfileImage';
const Sidebar = (props) => {
  const { className } = props;
  const user = useSelector(selectUserInfo);

  return (
    <aside id="logo-sidebar" className={'fixed w-64 h-screen ' + className}>
      <div className="grid place-content-center	flex-row bg-white w-full rounded-3xl overflow-hidden select-none">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-64 h-32 object-cover" />
        <Link
          to="/profile"
          className="shadow-md shadow-gray-500 absolute top-20 size-24 left-1/2 -translate-x-1/2 rounded-full"
        >
          <ProfileImage id={user.profileImageId} height="full" width="full" />
        </Link>
        <div className="grid gap-y-3 place-items-center pt-12 px-5 py-5">
          <Link to="/profile" className="grid place-items-center mt-3">
            <p className="font-medium text-md">{user.username ? user.username : 'demo usernam'}</p>
            <p className="text-sm">{user.email ? user.email : 'sem@gmai.com'}</p>
          </Link>
          <div className="grid place-items-center">
            <p className="font-medium text-md">Total Friends</p>
            <p className="text-sm">{user.totalFriends ? user.totalFriends : 0}</p>
          </div>
          <div className="grid place-items-center">
            <p className="font-medium text-md">Total posts</p>
            <p className="text-sm">{user.totalPost ? user.totalPost : 0}</p>
          </div>
          <hr className="h-1 w-full" />
          <Link to="/profile" className="text-primaryColor font-medium">
            View my profile
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
