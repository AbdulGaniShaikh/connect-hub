import Comment from 'components/shared/Comment';
import closeIcon from 'assets/icons/close.svg';
import { useEffect, useState } from 'react';
import NoData from 'components/shared/NoData';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { postService } from 'service';
import useErrorBehavior from 'hooks/useErrorBehavior';
import Spinner from 'components/shared/Spinner';

export default function Comments(props) {
  const { onCloseClick, postId } = props;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [page, setPage] = useState(0);
  const defaultErrorBehavior = useErrorBehavior();

  const fetchComments = async () => {
    try {
      setLoading(true);
      setFetchLoading(true);
      const res = await postService.getComments(postId, page);
      if (res.data.content.length > 0) {
        setComments([...comments, ...res.data.content]);
        setPage(page + 1);
      }
      // setComments(res.data.content);
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="h-full bg-white rounded-3xl py-5 pl-5 overflow-hidden">
      <div className="flex justify-between items-start mr-5">
        <h1 className="font-medium mb-3">Comments</h1>
        <img src={closeIcon} alt="close" className="size-5 cursor-pointer" onClick={onCloseClick} />
      </div>
      <hr className="mr-5" />
      <div className="h-full overflow-y-auto pb-5">
        {!loading && comments.length === 0 && <NoData message="No Comments yet." />}
        {!loading && comments.map((comment, id) => <Comment key={id} {...comment} />)}
        {loading &&
          Array(5)
            .fill(0)
            .map((_, id) => <UserCardSkeleton key={id} />)}
        {comments.length !== 0 && (
          <div
            onClick={() => {
              fetchComments();
            }}
            className="flex flex-row justify-center items-center text-center cursor-pointer select-none mt-5"
          >
            {fetchLoading && <Spinner color="text-blue-400" />}
            Load more
          </div>
        )}
      </div>
    </div>
  );
}
