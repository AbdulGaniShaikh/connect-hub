import { useEffect, useState } from 'react';
import Comments from 'components/shared/Comments';
import profilePlaceholder from 'assets/icons/user.svg';
import shareIcon from 'assets/icons/send.svg';
import { Link } from 'react-router-dom';
import ShareList from 'components/shared/ShareList';
import { clientUrl, imageUrl } from 'global';
import Model from 'components/shared/Model';
import { postService, toastService } from 'service';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../../redux/slices/userInfoSlice';
import { HttpStatusCode } from 'axios';
import useErrorBehavior from 'hooks/useErrorBehavior';
import Menu, { MenuItem } from 'components/shared/Menu';
import { copyTextToClipboard } from 'utility/copyToClipboard';
import Linkify from './Linkify';

const Post = (props) => {
  const { postId, totalComments, text, imageId, createDate, userId, username, profileImageId } = props;
  const [totalLikes, setTotalLikes] = useState(0);
  const defaultErrorBehavior = useErrorBehavior();

  const id = useSelector(selectUserInfo)?.userId;
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  var date = null;
  try {
    date = new Intl.DateTimeFormat('en-US', options).format(new Date(createDate));
  } catch (err) {
    date = userId;
  }

  const likedStyle = 'fa-heart fa-solid text-red-600 fa-lg active:scale-75 ease-in-out duration-200 cursor-pointer';
  const unLikedStyle = 'fa-heart fa-regular fa-lg active:scale-75 ease-in-out duration-200 cursor-pointer';

  const savedStyle = 'fa-bookmark fa-solid fa-lg active:scale-75 ease-in-out duration-200 cursor-pointer';
  const unSavedStyle = 'fa-bookmark fa-regular fa-lg active:scale-75 ease-in-out duration-200 cursor-pointer';

  const [showComments, setShowComments] = useState(false);
  const [showSharelist, setShowSharelist] = useState(false);

  const [isLiked, setLiked] = useState(false);
  const [isSave, setSave] = useState(false);
  const [canLike, setCanLike] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [comment, setComment] = useState('');

  const likePost = async () => {
    try {
      setLiked(true);
      await postService.likePost(postId, id);
      setTotalLikes(totalLikes + 1);
    } catch (error) {
      defaultErrorBehavior(error);
      if (error.response.status === HttpStatusCode.Conflict) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } finally {
      setCanLike(true);
    }
  };

  const unlikePost = async () => {
    try {
      setLiked(false);
      await postService.unlikePost(postId, id);
      setTotalLikes(totalLikes - 1);
    } catch (error) {
      setLiked(true);
      defaultErrorBehavior(error);
    } finally {
      setCanLike(true);
    }
  };

  const savePost = async () => {
    try {
      setSave(true);
      await postService.savePost(postId, id);
    } catch (error) {
      if (error.response.status === HttpStatusCode.Conflict) {
        setSave(true);
      } else {
        setSave(false);
      }
      defaultErrorBehavior(error);
    } finally {
      setCanSave(true);
    }
  };

  const unsavePost = async () => {
    try {
      setSave(false);
      await postService.unsavePost(postId, id);
    } catch (error) {
      setSave(true);
      defaultErrorBehavior(error);
    } finally {
      setCanSave(true);
    }
  };

  const onLikeClick = async () => {
    if (!canLike) return;
    setCanLike(false);
    if (!isLiked) {
      likePost();
    } else {
      unlikePost();
    }
  };

  const onSaveClick = () => {
    if (!canSave) return;
    setCanSave(false);
    if (!isSave) {
      savePost();
    } else {
      unsavePost();
    }
  };

  const onCommentClick = () => {
    setShowComments(!showComments);
  };

  const onForwardClick = () => {
    setShowSharelist(!showSharelist);
  };

  const postNewComment = async () => {
    try {
      await postService.postComment(postId, comment, id);
      toastService.success('New comment added');
      setComment('');
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  const fetchIsLikeAndSaved = async () => {
    try {
      const res = await postService.isLikedAndSaved(postId, id);
      setLiked(res.data.liked);
      setSave(res.data.saved);
      setCanLike(true);
      setCanSave(true);
    } catch (error) {
      defaultErrorBehavior(error);
    }
  };

  useEffect(() => {
    if (!postId || !id) return;
    fetchIsLikeAndSaved();
    setTotalLikes(props.totalLikes);
  }, [postId, id]);

  return (
    <div className="grid grid-flow-row bg-white p-4 rounded-3xl w-full">
      <div className="flex justify-between items-center w-full">
        <Link to={`/users/${userId}`} className="flex justify-start items-center w-fit">
          <img
            src={profileImageId ? `${imageUrl}/${profileImageId}` : profilePlaceholder}
            alt=""
            className="w-circleImage h-circleImage rounded-full bg-gray-100 aspect-square object-cover"
          />
          <div className="text-gray-900 focus:outline-none w-full text-sm mx-2 ">
            <p className="font-medium">{username ? username : 'username'}</p>{' '}
            <p className="text-xs font-thin">uploaded on {date}</p>
          </div>
        </Link>
        <Menu cancelItem={true}>
          <Link to={`/posts/${postId}`} target="_blank">
            <MenuItem value="Go to post" icon="fa-solid fa-up-right-from-square" />
          </Link>
          <MenuItem
            onClick={() => {
              copyTextToClipboard(`${clientUrl}/posts/${postId}`);
            }}
            value="Copy link"
            icon="fa-regular fa-copy"
          />
          <Link to={`/inbox/${userId}`} target="_blank">
            <MenuItem value={`Message "${username}"`} icon="fa-regular fa-message" />
          </Link>
          <Link to={`/users/${userId}`} target="_blank">
            <MenuItem value={`Visit ${username}'s profile`} icon="fa-regular fa-user" />
          </Link>
        </Menu>
      </div>

      <div className={text ? 'my-2' : 'hidden'}>
        <Linkify text={text !== null ? text : ''} />
      </div>

      <div
        className={
          imageId ? 'flex justify-center items-start mt-2 center rounded-md mb-3 bg-gray-100 overflow-hidden' : 'hidden'
        }
      >
        <img
          style={{ height: '50vh' }}
          src={imageId ? `${imageUrl}/${imageId}` : profilePlaceholder}
          alt="post"
          className="object-contain aspect-video"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center w-1/4">
          <i className={isLiked ? likedStyle : unLikedStyle} onClick={onLikeClick}></i>
          <i onClick={onCommentClick} className="fa-regular fa-comment fa-lg cursor-pointer"></i>
          <img onClick={onForwardClick} src={shareIcon} alt="share" className="size-5 cursor-pointer" />
        </div>
        <div>
          <i onClick={onSaveClick} className={isSave ? savedStyle : unSavedStyle}></i>
        </div>
      </div>
      <p className="text-sm py-2">{totalLikes} likes</p>
      <p onClick={onCommentClick} className="text-gray-700 font-thin my-2 cursor-pointer w-fit ">
        View all {totalComments !== 0 && totalComments} comments
      </p>
      <hr className="h-px bg-gray-200 border-0" />
      <div className="flex justify-between items-center">
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
          className="text-gray-900 focus:outline-none w-full text-sm font-medium py-2.5"
        ></input>
        {comment.trim().length > 0 && (
          <p onClick={postNewComment} className="text-primaryColor font-bold cursor-pointer">
            Post
          </p>
        )}
      </div>

      <Model
        onClose={() => {
          setShowComments(false);
        }}
        show={showComments}
      >
        <Comments postId={postId} onCloseClick={() => setShowComments(false)} />
      </Model>

      <Model
        onClose={() => {
          setShowSharelist(false);
        }}
        show={showSharelist}
      >
        <ShareList postId={postId} userId={id} onCloseClick={() => setShowSharelist(false)} />
      </Model>
    </div>
  );
};

export default Post;
