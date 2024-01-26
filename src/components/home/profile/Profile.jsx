import { useEffect, useState } from 'react';
import NewPost from '../NewPost';
import cover from './../../../assets/profile.jpg';
import Post from 'components/shared/Post';
import ProfileSection from './ProfileSection';
import DescriptionSection from './DescriptionSection';

const users = [
  {
    user: {
      username: 'tehgan',
      userId: '1'
    },
    date: '12:30pm',
    postId: '1',
    postImage: cover,
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

const Profile = () => {
  const [posts, setPosts] = useState(users);

  useEffect(() => {
    setPosts(users);
  }, []);
  return (
    <div className="px-5 w-full pb-5 grid grid-flow-row gap-y-5">
      <ProfileSection />
      <DescriptionSection />
      <NewPost />
      {posts.map((post) => (
        <Post {...post} id={1} />
      ))}
    </div>
  );
};

export default Profile;
