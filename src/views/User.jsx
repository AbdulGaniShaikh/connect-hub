import { useEffect, useState } from 'react';
import cover from './../assets/profile.jpg';
import { useParams } from 'react-router-dom/dist';
import axios from 'axios';
import ProfileSection from 'components/home/profile/ProfileSection';
import DescriptionSection from 'components/home/profile/DescriptionSection';
import Post from 'components/shared/Post';

const posts1 = [
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

const User = (props) => {
  const { id } = useParams();
  const [posts, setPosts] = useState(posts1);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((resp) => {
    //   setUser(resp.data.posts);
    // });
    // axios.get(`https://dummyjson.com/posts/user/${id}`).then((resp) => {
    //   setPosts(resp.data.posts);
    // });
    console.log('fetch profile and post data of visiting user here');
  }, []);
  return (
    <div className="px-5 w-full pb-5 grid grid-flow-row gap-y-5">
      <ProfileSection isVisitingProfile={true} id={id} />
      <DescriptionSection isVisitingProfile={true} />
      {posts.map((post) => (
        <Post {...post} id={id} />
      ))}
    </div>
  );
};

export default User;
