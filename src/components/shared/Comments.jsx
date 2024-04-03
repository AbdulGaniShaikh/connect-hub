import Comment from 'components/shared/Comment';
import { useEffect, useState } from 'react';
import NoData from 'components/shared/NoData';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { postService, toastService } from 'service';
import useErrorBehavior from 'hooks/useErrorBehavior';
import Spinner from 'components/shared/Spinner';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../../redux/slices/userInfoSlice';

export default function Comments(props) {
  const { onCloseClick = () => {}, postId = '', onNewCommentAdd = () => {} } = props;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [page, setPage] = useState(0);
  const defaultErrorBehavior = useErrorBehavior();
  const [comment, setComment] = useState('');
  const { userId, profileImageId, username } = useSelector(selectUserInfo);
  const postNewComment = async () => {
    try {
      await postService.postComment(postId, comment, userId);
      setComments([{ userId, profileImageId, username, comment, date: new Date() }, ...comments]);
      setComment('');
      onNewCommentAdd();
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      setFetchLoading(true);
      const res = await postService.getComments(postId, page);
      if (res.data.content.length > 0) {
        setComments([...comments, ...res.data.content]);
        setPage(page + 1);
      }
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
    <div className="flex flex-col w-full max-h-full bg-lightBg dark:bg-darkBg rounded-t-3xl sm:rounded-3xl py-5 pl-5 overflow-hidden">
      <div className="flex justify-between items-center mr-5">
        <h1 className="font-medium mb-3">Comments</h1>
        <i className="fa-solid fa-close fa-lg cursor-pointer" onClick={onCloseClick}></i>
      </div>
      <div className="flex-1 overflow-y-auto pb-5">
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
      <div className="flex justify-between items-center border-t dark:border-darkHover border-lightHover mr-5">
        <input
          alt="post-data"
          type="text"
          name="comment"
          placeholder="Add a comment"
          autoComplete="off"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className="bg-lightBg dark:bg-darkBg focus:outline-none w-full text-sm font-medium py-2.5"
        ></input>
        {comment.trim().length > 0 && (
          <p onClick={postNewComment} className="text-primaryColor font-bold cursor-pointer">
            Post
          </p>
        )}
      </div>
    </div>
  );
}
