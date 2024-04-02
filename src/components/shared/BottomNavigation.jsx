import { Link, NavLink } from 'react-router-dom/dist';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../../redux/slices/userInfoSlice';
import ProfileImage from './ProfileImage';
const iconList = [
  {
    icon: 'fa-home',
    to: '/',
    alt: 'Home'
  },
  {
    icon: 'fa-magnifying-glass',
    to: '/search',
    alt: 'Search'
  },
  {
    icon: 'fa-user-plus',
    to: '/friend-requests',
    alt: 'Requests'
  }
];

const BottomNavigation = () => {
  const { profileImageId } = useSelector(selectUserInfo);

  return (
    <div style={{ zIndex: '1' }} className="fixed bottom-0 bg-lightHover dark:bg-darkHover h-16 w-full">
      <div className="flex flex-row items-center justify-evenly h-full w-full">
        {iconList.map((item, i) => (
          <BottomNavigationIcon {...item} key={i} />
        ))}
        <Link
          to="/profile"
          className="size-10 flex justify-center items-center rounded-full outline outline-primaryColor"
        >
          <ProfileImage id={profileImageId} height="full" width="full" />
        </Link>
      </div>
    </div>
  );
};

const BottomNavigationIcon = (props) => {
  const { icon, to, alt } = props;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-gray-500 flex flex-col justify-center items-center ${isActive ? 'nav-active' : ''}`
      }
    >
      <i className={`fa-solid ${icon} text-xl`}></i>
      <p>{alt}</p>
    </NavLink>
  );
};

export default BottomNavigation;
