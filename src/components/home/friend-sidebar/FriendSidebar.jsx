import FriendRequests from 'components/home/friend-sidebar/FriendRequests';
import YourFriendsContainer from 'components/home/friend-sidebar/YourFriendsContainer';

const FriendSidebar = (props) => {
  const { className } = props;
  return (
    <div className={'fixed w-64 ' + className}>
      <FriendRequests />
      <div className="mt-5"></div>
      <YourFriendsContainer />
    </div>
  );
};

export default FriendSidebar;
