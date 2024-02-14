import Comment from './Comment';
import closeIcon from './../../assets/icons/close.svg';
import { useEffect, useState } from 'react';
import NoData from './NoData';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { postService, toastService } from 'service';

export default function Comments(props) {
  const { onCloseClick, postId } = props;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService
      .getComments(postId, 0)
      .then((res) => {
        setComments(res.data.content);
      })
      .catch((error) => {
        toastService.error(`error loading comments\nReason: ${error.response.data?.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  return (
    <div className="h-full bg-white rounded-3xl py-5 pl-5 overflow-hidden">
      <div className="flex justify-between items-start mr-5">
        <h1 className="font-medium mb-3">Comments</h1>
        <img src={closeIcon} alt="close" className="size-5 cursor-pointer" onClick={onCloseClick} />
      </div>
      <hr className="mr-5" />
      <div className="h-full overflow-y-auto pb-5">
        {loading &&
          Array(15)
            .fill(0)
            .map((_, id) => <UserCardSkeleton />)}
        {!loading && comments.length === 0 && <NoData message="No Comments yet." />}
        {comments.map((comment, id) => (
          <Comment key={id} {...comment} />
        ))}
      </div>
    </div>
  );
}
