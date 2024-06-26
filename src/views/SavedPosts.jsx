import NoData from 'components/shared/NoData';
import Post from 'components/shared/Post';
import PostSkeleton from 'components/skeletons/PostSkeleton';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../redux/slices/userInfoSlice';
import { userService } from 'service';
import { Pagination } from '@mui/material';
import useErrorBehavior from 'hooks/useErrorBehavior';
import BackButton from 'components/buttons/BackButton';

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ pageNumber: 1, totalPages: 0 });
  const [pageFlag, setPageFlag] = useState(false);
  const { userId } = useSelector(selectUserInfo);
  const defaultErrorBehavior = useErrorBehavior();

  const fetchSavedPost = async () => {
    setLoading(true);
    try {
      const res = await userService.getSavedPosts(userId, page.pageNumber - 1);
      setPosts(res.data?.content);
      var { totalPages } = res.data;
      if (page.totalPages !== totalPages) setPage({ ...page, totalPages });
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchSavedPost();
  }, [userId, pageFlag]);

  return (
    <div className="w-full pb-5">
      <div className="font-medium px-5 pt-5">
        <BackButton />
        Saved Posts
      </div>
      {loading &&
        Array(2)
          .fill(1)
          .map((_, i) => <PostSkeleton key={i} />)}
      {posts.map((post) => (
        <Post {...post} key={post.postId} />
      ))}
      {!loading && posts.length === 0 && (
        <div className="p-5">
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
              setPageFlag(!pageFlag);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SavedPosts;
