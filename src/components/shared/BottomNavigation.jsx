import { Link } from 'react-router-dom/dist';
import { home, search, user, userPlus, users } from './../../assets/icons';
import { useEffect, useState } from 'react';
import placeholder from './../../assets/profile.jpg';
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
    icon: users,
    to: '/all-friends',
    alt: 'Friends'
  },
  {
    icon: userPlus,
    to: '/friend-requests',
    alt: 'Requests'
  }
];

const BottomNavigation = () => {
  const [profile, setProfile] = useState(placeholder);

  useEffect(() => {
    // fetch user profile here
  }, []);

  return (
    <div className="fixed bottom-0 bg-white h-16 w-full z-10">
      <ul className="flex flex-row items-center justify-evenly h-full w-full">
        {iconList.map((item) => (
          <BottomNavigationIcon {...item} />
        ))}
        <li>
          <Link to={'/profile'} className=" flex flex-col justify-center items-center">
            <img
              src={profile}
              alt="profile"
              className="size-10 bg-red-400 rounded-full object-cover outline outline-primaryColor"
            />
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
