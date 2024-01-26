import axios from 'axios';
import NoData from 'components/shared/NoData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';

const Inbox = (props) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((payload) => {
      if (payload.status === 200) {
        setFriends(payload.data.concat(payload.data));
      }
    });
  }, []);
  return (
    <div className="px-5 w-full pb-5 grid grid-flow-row gap-y-5">
      <div className="h-full w-full rounded-3xl p-5 bg-white">
        <p className="font-medium pb-2">Messages</p>
        {friends.length <= 0 ? (
          <NoData message="You don't have any friends" />
        ) : (
          friends.map((data) => {
            return <InboxItem {...data} />;
          })
        )}
        <div className="text-center cursor-pointer select-none">Show more</div>
      </div>
    </div>
  );
};

const InboxItem = (props) => {
  const { profile, username, email, id } = props;
  return (
    <div className="w-full p-2 hover:bg-gray-100 *:cursor-pointer rounded-md">
      <a href={`/inbox/${id}`} className="flex overflow-hidden items-center">
        <img src={profile ? profile : 'logo512.png'} alt={id} className="rounded-full h-circleImage w-circleImage" />
        <div className="text-gray-900 grow text-sm px-2.5 overflow-hidden">
          <p className="font-medium overflow-ellipsis overflow-hidden ">{username ? username : 'username'}</p>
          <p className="font-bold text-xs overflow-ellipsis overflow-hidden">{email ? email : 'email'}</p>
        </div>
        <p className="rounded-full bg-blue-500 p-1 h-2 w-2"></p>
      </a>
    </div>
  );
};

export default Inbox;
