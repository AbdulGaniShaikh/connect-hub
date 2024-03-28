import { Link } from 'react-router-dom';
import { selectUserInfo } from './../../../redux/slices/userInfoSlice';
import { selectCount, setCount } from './../../../redux/slices/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Model from 'components/shared/Model';
import SettingsDialog from 'components/home/navbar/SettingsDialog';
import chatService from 'service/chatService';
import useErrorBehavior from 'hooks/useErrorBehavior';
import ProfileImage from 'components/shared/ProfileImage';

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const user = useSelector(selectUserInfo);
  const defaultErrorBehavior = useErrorBehavior();
  const unreadCount = useSelector(selectCount);
  const dispatch = useDispatch();

  const fetchTotalUnreadConvo = async () => {
    if (!user || !user.userId) return;
    try {
      const res = await chatService.fetchTotalUnreadConvo(user.userId);
      dispatch(setCount(res.data.count));
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  useEffect(() => {
    fetchTotalUnreadConvo();
  }, [user.userId]);

  return (
    <nav className="z-10 fixed top-0 left-0 bg-white w-full py-2.5 border-b-2 border-gray-200 xl:px-40">
      <div className="px-5 grid grid-cols-2 max-sm:grid-cols-2 justify-between items-center ">
        <div className="flex items-center">
          <Link to="" className="flex items-center gap-3">
            <img src="/favicon.ico" alt="logo" className="size-7" />
            <h1 className="text-2xl">ConnectHub</h1>
          </Link>
        </div>

        <div className="flex justify-self-end gap-x-10 items-center text-xl">
          <Link to="/search" className="max-sm:hidden">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>

          <Link to="/inbox" className="relative">
            <i className="fa-regular fa-message"></i>
            {unreadCount > 0 && (
              <p className="absolute -top-1 -right-2 text-center text-white p-px size-5 rounded-full bg-primaryColor text-xs">
                {unreadCount}
              </p>
            )}
          </Link>
          <div
            onClick={() => {
              setShowSettings(true);
            }}
          >
            <i className="fa-solid fa-gear cursor-pointer"></i>
          </div>
          <Link to="/profile" className="max-sm:hidden">
            <ProfileImage id={user.profileImageId} key={1} />
          </Link>
        </div>

        <Model
          onClose={() => {
            setShowSettings(false);
          }}
          show={showSettings}
        >
          <SettingsDialog userId={user.userId} onCloseClick={() => setShowSettings(false)} />
        </Model>
      </div>
    </nav>
  );
};

export default Navbar;
