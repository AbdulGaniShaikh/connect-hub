import axios from 'axios';
import UserProfileRectangle from 'components/home/friend-sidebar/UserProfileRectangle';
import { useState } from 'react';

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

const Search = () => {
  const [searchVal, setSearchVal] = useState('');
  const [searchRes, setSearchRes] = useState([]);

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      alert('enter pressed');
    }
  };

  return (
    <div className="w-full mx-5 p-5 rounded-3xl overflow-hidden bg-white">
      <div className="flex items-center px-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 ring-red-100 focus:border-transparent focus:outline-none hover:ring-4 ease-linear duration-200">
        <input
          alt="search"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          autoComplete="off"
          value={searchVal}
          onChange={onChange}
          className="px-3 py-2.5 focus:outline-none w-full"
          onKeyUp={onKeyUp}
        />
        <i class="fa-solid fa-magnifying-glass cursor-pointer"></i>
      </div>
      <div className="h-full pt-5">
        {userList
          .filter((user) => user.username.includes(searchVal) || user.email.includes(searchVal))
          .map((user) => (
            <UserProfileRectangle {...user} />
          ))}
      </div>
    </div>
  );
};

export default Search;
