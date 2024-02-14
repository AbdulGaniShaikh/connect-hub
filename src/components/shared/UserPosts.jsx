import { HttpStatusCode } from 'axios';
import PostSkeleton from 'components/skeletons/PostSkeleton';
import { useState, useEffect } from 'react';
import { postService, toastService } from 'service';
import Post from './Post';
import NoData from './NoData';

const UserPosts = (props) => {
  const { user } = props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.userId) {
      postService
        .getPostsOfUser(user.userId, 0, 10)
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            console.log(res.data.content);
            setPosts(res.data.content);
          }
        })
        .catch((error) => {
          const res = error.response;
          toastService.error(res.response.data.message);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);
  return (
    <>
      {loading &&
        Array(2)
          .fill(1)
          .map((_, i) => <PostSkeleton key={i} />)}
      {posts.map((post) => (
        <Post {...post} {...user} key={post.postId} />
      ))}
      {!loading && posts.length === 0 && (
        <div className="bg-white rounded-3xl h-full w-full p-5">
          <NoData message={`${user.username} haven't posted anything`} />
        </div>
      )}
    </>
  );
};

export default UserPosts;
