import Sidebar from '../../components/home/sidebar/Sidebar';
import Navbar from '../../components/home/navbar/Navbar';
import MainContent from 'components/home/MainContent';
import FriendSidebar from 'components/home/friend-sidebar/FriendSidebar';

const Home = () => {
  return (
    <div className="bg-gray-50 overflow-hidden">
      <Navbar />
      <div className="grid mx-40 pt-20 grid-flow-col ">
        <Sidebar />
        <MainContent />
        <FriendSidebar />
      </div>
    </div>
  );
};

export default Home;
