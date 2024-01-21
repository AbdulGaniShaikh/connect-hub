import { useEffect, useState } from 'react';
import SingleFriendRequest from './SingleFriendRequest';
import { useNavigate } from 'react-router-dom';

const friendReq = [
  {
    username: 'user1',
    email: 'shakhabdulga@gmail.com',
    userid: '1',
    profile: 'https://api.multiavatar.com/Binx%20Bond.png'
  },
  {
    username: 'user2',
    email: 'skhaasdadadabud@gmai.com',
    userid: '2',
    profile: 'https://api.multiavatar.com/Binx%20Bond.png'
  }
];
const FriendRequests = () => {
  const [friendReqs, setFriendReqs] = useState(friendReq);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('getting fr');
  }, []);

  const onClick = (id) => {
    setFriendReqs(friendReqs.filter((friendData) => friendData.userid !== id));
  };

  const diplayFriendRequests = () => {
    return friendReqs.map((req) => <SingleFriendRequest {...req} onClick={onClick} />);
  };

  const onViewAllFRClick = () => {
    navigate('/friend-requests');
  };

  return (
    <div>
      <div className="grid gap-y-3 flow-row bg-white rounded-3xl p-5">
        <p className="font-medium">Friend Requests</p>
        <div className="w-full">
          {friendReqs.length <= 0 ? <div className="text-sm">You have no friend request</div> : diplayFriendRequests()}
        </div>
        <hr />
        <p onClick={onViewAllFRClick} className="place-self-center text-primaryColor font-medium cursor-pointer">
          View all requests
        </p>
      </div>
    </div>
  );
};

export default FriendRequests;
