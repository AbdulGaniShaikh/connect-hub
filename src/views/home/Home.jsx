import Sidebar from '../../components/home/sidebar/Sidebar';
import Navbar from '../../components/home/navbar/Navbar';
import FriendSidebar from 'components/home/friend-sidebar/FriendSidebar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { setRequests } from './../../redux/slices/friendRequestsSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import BottomNavigation from 'components/shared/BottomNavigation';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((payload) => {
      if (payload.status === 200) {
        dispatch(setRequests(payload.data.slice(0, 10)));
      }
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="grid mx-5 max-lg:mr-0 max-md:mx-0 xl:mx-40 pt-20 grid-flow-col ">
        <Sidebar className="max-md:hidden" />
        <div className="flex justify-center lg:mr-64 md:ml-64 max-md:mb-16">
          <Outlet />
        </div>
        <FriendSidebar className="max-lg:hidden xl:right-40 right-5" />
      </div>
      <div className="md:hidden">
        {/* <div> */}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Home;
