import FriendRequests from 'components/home/friend-sidebar/FriendRequests';
import YourFriendsContainer from 'components/home/friend-sidebar/YourFriendsContainer';

const FriendSidebar = (props) => {
  const { className } = props;
  return (
    <div className={`fixed flex flex-col h-screen w-64 gap-y-5  ${className}`}>
      <FriendRequests />
      <YourFriendsContainer />
    </div>
  );
};

export default FriendSidebar;
