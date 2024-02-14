import NoData from 'components/shared/NoData';
import Post from 'components/shared/Post';
import PostSkeleton from 'components/skeletons/PostSkeleton';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../redux/slices/userInfoSlice';
import { userService } from 'service';
import { Pagination } from '@mui/material';

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ pageNumber: 1, totalPages: 0 });
  const { userId } = useSelector(selectUserInfo);
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    userService
      .getSavedPosts(userId, page.pageNumber - 1)
      .then((res) => {
        setPosts(res.data?.content);
        var { totalPages } = res.data;
        if (page.totalPages !== totalPages) setPage({ ...page, totalPages });
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [userId, page]);

  return (
    <div className="grid grid-flow-row gap-y-5 px-5 w-full pb-5">
      {loading &&
        Array(2)
          .fill(1)
          .map((_, i) => <PostSkeleton key={i} />)}
      {posts.map((post) => (
        <Post {...post} key={post.postId} />
      ))}
      {!loading && posts.length === 0 && (
        <div className="grid grid-flow-row bg-white p-5 rounded-3xl">
          <NoData message="Oops! It looks like haven't saved anything at the moment." />
        </div>
      )}
      {!loading && posts.length !== 0 && (
        <div className="flex flex-col justify-center items-center">
          <Pagination
            count={page.totalPages}
            variant="outlined"
            shape="rounded"
            size="large"
            page={page.pageNumber}
            onChange={(_, i) => {
              setPage({ ...page, pageNumber: i });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SavedPosts;
