import FriendRequests from './FriendRequests';
import YourFriendsContainer from './YourFriendsContainer';

const FriendSidebar = () => {
  return (
    <div className="fixed right-40 w-64">
      <FriendRequests />
      <div className="mt-5"></div>
      <YourFriendsContainer />
    </div>
  );
};

export default FriendSidebar;
