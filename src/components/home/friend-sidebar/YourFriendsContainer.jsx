import { useEffect, useState } from 'react';
import UserProfileRectangle from './UserProfileRectangle';
import { useNavigate } from 'react-router-dom';

const userList = [
  {
    username: 'abduldadadadadadadadagani',
    email: 'shkhabduadadadaslgani@gmail.com',
    profile: 'logo512.png',
    userId: '1'
  },
  {
    username: 'tehzib shaikh',
    email: 'tehzib@gmail.com',
    profile: '',
    userId: '2'
  },
  {
    username: 'tehgan',
    email: 'tehgangaming@gmail.com',
    profile: '',
    userId: '3'
  }
];

const YourFriendsContainer = () => {
  const [friendsList, setFriendList] = useState([]);

  const navigate = useNavigate();
  const onViewAllFriendsClick = () => {
    navigate(`all-friends`);
  };

  const displayFriends = () => {
    return userList.map((data) => <UserProfileRectangle {...data} />);
  };

  useEffect(() => {
    setFriendList(userList);
  }, [friendsList]);

  return (
    <div className="grid gap-y-3 flow-row bg-white rounded-3xl p-5">
      <h1 className="font-medium">Your friends</h1>
      <div className="grid flow-row ">
        {friendsList.length <= 0 ? <div className="text-sm">You have no friend request</div> : displayFriends()}
      </div>
      <hr />
      <p onClick={onViewAllFriendsClick} className="place-self-center text-primaryColor font-medium cursor-pointer">
        View all friends
      </p>
    </div>
  );
};

export default YourFriendsContainer;
