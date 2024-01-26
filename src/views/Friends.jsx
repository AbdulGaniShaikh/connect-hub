import axios from 'axios';
import { useEffect, useState } from 'react';
import message from 'assets/icons/send.svg';
import remove from 'assets/icons/user-remove.svg';
import NoData from 'components/shared/NoData';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((payload) => {
      if (payload.status === 200) {
        setFriends(payload.data.slice(0, 10));
      }
    });
  }, []);

  const onUnfriend = (id) => {
    setFriends(friends.filter((user) => user.id !== id));
  };

  return (
    <div className="px-5 h-full w-full pb-5 grid grid-flow-row">
      <div className="bg-white rounded-3xl h-full w-full p-5">
        <p className="font-medium pb-2"> My Friends</p>
        {friends.length <= 0 ? (
          <NoData message="You don't have any friends" />
        ) : (
          friends.map((data) => {
            return <Friend {...data} onUnfriend={onUnfriend} />;
          })
        )}
      </div>
    </div>
  );
};

const Friend = (props) => {
  const { profile, username, email, id, onUnfriend } = props;
  const navigate = useNavigate();
  const onUserClick = () => {
    navigate(`/users/${id}`);
  };
  const onUnfriendClick = () => {
    onUnfriend(id);
  };
  const messageUser = () => {
    navigate(`/inbox/${id}`);
  };
  return (
    <div className="w-full p-2 hover:bg-gray-100 *:cursor-pointer rounded-md">
      <div className="flex overflow-hidden items-center">
        <img
          onClick={onUserClick}
          src={profile ? profile : 'logo512.png'}
          alt={id}
          className="rounded-full h-circleImage w-circleImage"
        />
        <div onClick={onUserClick} className=" text-gray-900 grow text-sm px-2.5 overflow-hidden">
          <p className="font-medium overflow-ellipsis overflow-hidden ">{username ? username : 'username'}</p>
          <p className="font-thin text-xs overflow-ellipsis overflow-hidden">{email ? email : 'email'}</p>
        </div>
        <div className="flex gap-x-2">
          <div
            onClick={messageUser}
            className="flex-none flex justify-center items-center p-1 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <img src={message} alt="" className="size-5" />
          </div>
          <div
            onClick={onUnfriendClick}
            className="flex-none flex justify-center items-center p-1 rounded-md bg-red-400 hover:bg-red-500"
          >
            <img src={remove} alt="" className="size-5 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
