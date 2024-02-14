import Post from 'components/shared/Post';
import NewPost from './NewPost';
import { useEffect, useRef, useState } from 'react';
import PostSkeleton from './../skeletons/PostSkeleton';
import { selectUserInfo } from './../../redux/slices/userInfoSlice';
import { useSelector } from 'react-redux';
import { postService } from './../../service';
import { HttpStatusCode } from 'axios';
import NoData from 'components/shared/NoData';
import { useIsVisible } from 'hooks/useIsVisible';

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [pageToAsk, setPageToAsk] = useState(0);
  const endOfFeed = useRef(null);
  const user1 = useSelector(selectUserInfo);
  const isVisible = useIsVisible(endOfFeed);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setUser(user1);
    fetchPosts();
  }, [user1]);

  const fetchPosts = () => {
    setLoading(true);
    if (user1.userId) {
      postService
        .getFeed(user1.userId, pageToAsk)
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            if (res.data?.length > 0) {
              setPosts([...posts, ...res.data]);
              setPageToAsk(pageToAsk + 1);
            }
          }
        })
        .catch((error) => {})
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchPosts();
    }
  }, [isVisible]);

  return (
    <div className="grid grid-flow-row gap-y-5 px-5 w-full pb-5">
      <NewPost />

      {posts.map((post, i) => (
        <Post {...post} key={i} />
      ))}
      <div ref={endOfFeed}></div>
      {loading &&
        Array(2)
          .fill(1)
          .map((_, i) => <PostSkeleton key={i} />)}
      {!loading && posts.length === 0 && (
        <div className="grid grid-flow-row bg-white p-4 rounded-3xl">
          <NoData message="Oops! It looks like your feed is empty at the moment." />
        </div>
      )}
    </div>
  );
};

export default MainContent;
