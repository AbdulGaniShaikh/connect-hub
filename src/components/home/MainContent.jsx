import Post from 'components/shared/Post';
import NewPost from './NewPost';
import profile from './../../assets/profile.jpg';
import { useEffect, useState } from 'react';
// import axios from 'axios';

const users = [
  {
    user: {
      username: 'tehgan',
      userId: '1'
    },
    date: '12:30pm',
    postId: '1',
    postImage: profile,
    postText: 'Something in the way'
  },
  {
    user: {
      username: 'tehgan',
      userId: '1'
    },
    date: '12:30pm',
    postId: '2',
    postImage: 'https://wallpapercrafter.com/th8001/520604-Movie-Crossover-Deadpool-Thanos-4K.jpg',
    postText: 'second image'
  }
];

const MainContent = () => {
  const [posts, setPosts] = useState(users);

  useEffect(() => {
    setPosts(users);
  }, []);

  return (
    <div className="grid grid-flow-row gap-y-5 px-5 w-full pb-5">
      <NewPost />
      {posts.map((post) => (
        <Post {...post} id={1} />
      ))}
    </div>
  );
};

export default MainContent;
