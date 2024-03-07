import { useNavigate } from 'react-router-dom';
import profileDefault from 'assets/icons/user.svg';
import { selectUserInfo } from './../../../redux/slices/userInfoSlice';
import { useSelector } from 'react-redux';
import { imageUrl } from 'global';
const Sidebar = (props) => {
  const { className } = props;
  const navigate = useNavigate();
  const user = useSelector(selectUserInfo);
  const onClick = () => {
    navigate('/profile');
  };

  return (
    <aside id="logo-sidebar" className={'fixed w-64 h-screen ' + className}>
      <div className="grid place-content-center	flex-row bg-white w-full rounded-3xl overflow-hidden select-none">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-64 h-32 object-cover" />
        <img
          className="shadow-md shadow-gray-500 absolute top-20 left-1/2 -translate-x-1/2 rounded-full h-24 w-24 object-cover cursor-pointer bg-white"
          src={user.profileImageId ? `${imageUrl}/${user.profileImageId}` : profileDefault}
          alt="Userprofile"
          onClick={onClick}
        />
        <div className="grid gap-y-3 place-items-center pt-12 px-5 py-5">
          <div className="grid place-items-center cursor-pointer mt-3" onClick={onClick}>
            <p className="font-medium text-md">{user.username ? user.username : 'demo usernam'}</p>
            <p className="text-sm">{user.email ? user.email : 'sem@gmai.com'}</p>
          </div>
          <div className="grid place-items-center">
            <p className="font-medium text-md">Total Friends</p>
            <p className="text-sm">{user.totalFriends ? user.totalFriends : 0}</p>
          </div>
          <div className="grid place-items-center">
            <p className="font-medium text-md">Total posts</p>
            <p className="text-sm">{user.totalPost ? user.totalPost : 0}</p>
          </div>
          <hr className="h-1 w-full" />
          <p className="text-primaryColor font-medium cursor-pointer" onClick={onClick}>
            View my profile
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
