import Comment from './Comment';
import closeIcon from './../../assets/icons/close.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Comments(props) {
  const { onCloseClick, postId } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log('fetching comments');
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then((response) => {
      setComments(response.data);
    });
    // .catch((response) => alert(response));
  }, []);

  return (
    <div className="h-full bg-white rounded-3xl py-5 pl-5 overflow-hidden">
      <div className="flex justify-between items-start mr-5">
        <h1 className="font-medium mb-3">Comments</h1>
        <img src={closeIcon} alt="close" className="size-5 cursor-pointer" onClick={onCloseClick} />
      </div>
      <hr className="mr-5" />
      <div className="h-full overflow-y-auto pb-5">
        {comments.map((comment) => (
          <Comment {...comment} />
        ))}
      </div>
    </div>
  );
}
