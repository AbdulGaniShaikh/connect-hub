import { Link } from 'react-router-dom/dist';
import { home, search, user, userPlus } from 'assets/icons';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../../redux/slices/userInfoSlice';
import { imageUrl } from 'global';
import ProfileImage from './ProfileImage';
const iconList = [
  {
    icon: home,
    to: '/',
    alt: 'Home'
  },
  {
    icon: search,
    to: '/search',
    alt: 'Search'
  },
  {
    icon: userPlus,
    to: '/friend-requests',
    alt: 'Requests'
  }
];

const BottomNavigation = () => {
  const { profileImageId } = useSelector(selectUserInfo);

  return (
    <div className="fixed bottom-0 bg-white h-16 w-full z-10">
      <ul className="flex flex-row items-center justify-evenly h-full w-full">
        {iconList.map((item, i) => (
          <BottomNavigationIcon {...item} key={i} />
        ))}
        <li>
          <Link
            to="/profile"
            className="size-10 flex justify-center items-center rounded-full outline outline-primaryColor"
          >
            <ProfileImage id={profileImageId} height="full" width="full" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

const BottomNavigationIcon = (props) => {
  const { icon, to, alt } = props;
  return (
    <li>
      <Link to={to} className="flex flex-col justify-center items-center">
        <img src={icon} alt={alt} className="size-6" />
        <p>{alt}</p>
      </Link>
    </li>
  );
};

export default BottomNavigation;
