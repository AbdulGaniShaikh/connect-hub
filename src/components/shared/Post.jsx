import { useEffect, useState } from 'react';
import Comments from './Comments';
import profilePlaceholder from './../../assets/icons/user.svg';
import shareIcon from './../../assets/icons/send.svg';
import { Link } from 'react-router-dom';
import ShareList from './ShareList';
import { imageUrl } from './../../global';
import Model from './Model';
import { postService, toastService } from 'service';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../../redux/slices/userInfoSlice';
import { HttpStatusCode } from 'axios';

const Post = (props) => {
  const { postId, totalComments, text, imageId, createDate, userId, username, profileImageId } = props;
  const [totalLikes, setTotalLikes] = useState(props.totalLikes);

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

  const onLikeClick = () => {
    if (!canLike) return;
    setCanLike(false);
    if (!isLiked) {
      setLiked(true);

      postService
        .likePost(postId, id)
        .then(() => {
          setLiked(true);
          setTotalLikes(totalLikes + 1);
        })
        .catch((error) => {
          if (error.response.status === HttpStatusCode.Conflict) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        })
        .finally(() => {
          setCanLike(true);
        });
    } else {
      setLiked(false);
      postService
        .unlikePost(postId, id)
        .then(() => {
          setLiked(false);
          setTotalLikes(totalLikes - 1);
        })
        .catch((error) => {
          setLiked(true);
        })
        .finally(() => {
          setCanLike(true);
        });
    }
  };

  const onSaveClick = () => {
    if (!canSave) return;
    setCanSave(false);
    if (!isSave) {
      setSave(true);
      postService
        .savePost(postId, id)
        .then(() => {
          setSave(true);
        })
        .catch((error) => {
          if (error.response.status === HttpStatusCode.Conflict) {
            setSave(true);
          } else {
            setSave(false);
          }
        })
        .finally(() => {
          setCanSave(true);
        });
    } else {
      setSave(false);
      postService
        .unsavePost(postId, id)
        .then(() => {
          setSave(false);
        })
        .catch((error) => {
          setSave(true);
        })
        .finally(() => {
          setCanSave(true);
        });
    }
  };

  const onCommentClick = () => {
    setShowComments(!showComments);
  };

  const onForwardClick = () => {
    setShowSharelist(!showSharelist);
  };

  const postNewComment = () => {
    postService
      .postComment(postId, comment, id)
      .then((res) => {
        toastService.success('New comment added');
        setComment('');
      })
      .catch((error) => {
        if (error.response.status >= 500) {
          toastService.error("Internal server error. Couldn't add new comment");
        } else {
          toastService.error(error.response.data?.message);
        }
      });
  };

  useEffect(() => {
    if (!postId || !id) return;
    postService
      .isLikedAndSaved(postId, id)
      .then((res) => {
        setLiked(res.data.liked);
        setSave(res.data.saved);
        setCanLike(true);
        setCanSave(true);
      })
      .catch((error) => {
        if (error.response.status >= 500) {
          toastService.error("Internal server error. Couldn't fetch like and bookmark data");
        } else {
          toastService.error(error.response.data?.message);
        }
      });
  }, [postId, id]);

  return (
    <div className="grid grid-flow-row bg-white p-4 rounded-3xl w-full">
      <Link to={`/users/${userId}`} className="flex justify-start items-center w-fit ">
        <img
          src={profileImageId ? `${imageUrl}/${profileImageId}` : profilePlaceholder}
          alt=""
          className="w-circleImage h-circleImage rounded-full bg-gray-100 aspect-square object-cover cursor-pointer "
        />
        <div className="text-gray-900 focus:outline-none w-full text-sm mx-2 ">
          <p className="font-medium cursor-pointer">{username ? username : 'username'}</p>{' '}
          <p className="text-xs font-thin">uploaded on {date}</p>
        </div>
      </Link>

      <div className={text ? 'my-2' : 'hidden'}>
        <p>{text}</p>
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
      {showComments && (
        <Model
          onClose={() => {
            setShowComments(false);
          }}
        >
          <Comments postId={postId} onCloseClick={() => setShowComments(false)} />
        </Model>
      )}
      {showSharelist && (
        <Model
          onClose={() => {
            setShowSharelist(false);
          }}
        >
          <ShareList postId={postId} userId={id} onCloseClick={() => setShowSharelist(false)} />
        </Model>
      )}
    </div>
  );
};

export default Post;
