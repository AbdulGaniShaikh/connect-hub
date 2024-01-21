import { useEffect, useRef, useState } from 'react';
import Comments from './Comments';
import profilePlaceholder from './../../assets/profile.jpg';
import shareIcon from './../../assets/icons/send.svg';
import { useNavigate } from 'react-router-dom';
import ShareList from './ShareList';
// import axios from 'axios';
import useScrollBlock from 'hooks/useScrollBlock';

const friends = [
  {
    profile: 'logo512.png',
    username: 'tegan1',
    userId: '1',
    email: 'shkhabdilgani@gmail.com'
  },
  {
    profile: 'logo512.png',
    username: 'tegan2',
    userId: '2',
    email: 'shkhabdilgani@gmail.com'
  },
  {
    profile: 'logo512.png',
    username: 'tegan3',
    userId: '3',
    email: 'shkhabdilgani@gmail.com'
  }
];

const Post = (props) => {
  const { postId, postText, postImage, user, date } = props;
  const { username, userId, profile } = user;
  const navigate = useNavigate();
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    console.log('fetching in post');
  }, []);

  const likeRef = useRef(null);
  const saveRef = useRef(null);
  const commentsDialogDiv = useRef(null);
  const commentsDialogRef = useRef(null);
  const forwardDialogRef = useRef(null);
  const forwardDialogDiv = useRef(null);

  const [postButtonVisible, setPostButtonVisible] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [isSave, setSave] = useState(false);

  const onCommentChange = (data) => {
    if (data.target.value.trim() === '') {
      setPostButtonVisible(false);
    } else {
      setPostButtonVisible(true);
    }
  };

  const onLikeClick = () => {
    if (!isLiked) {
      likeRef.current.classList.remove('fa-regular');
      likeRef.current.classList.add('fa-solid');
      likeRef.current.classList.add('text-red-600');
    } else {
      likeRef.current.classList.add('fa-regular');
      likeRef.current.classList.remove('fa-solid');
      likeRef.current.classList.remove('text-red-600');
    }
    setLiked(!isLiked);
  };

  const onSaveClick = () => {
    if (!isSave) {
      saveRef.current.classList.remove('fa-regular');
      saveRef.current.classList.add('fa-solid');
    } else {
      saveRef.current.classList.add('fa-regular');
      saveRef.current.classList.remove('fa-solid');
    }
    setSave(!isSave);
  };

  const onCommentClick = () => {
    commentsDialogDiv.current.classList.remove('hidden');
    commentsDialogRef.current.classList.remove('translate-y-full');
    // document.body.style.overflow = 'hidden';
    blockScroll();
  };
  const onCommentCloseClick = () => {
    commentsDialogDiv.current.classList.add('hidden');
    commentsDialogRef.current.classList.add('translate-y-full');
    // document.body.style.overflow = 'unset';
    allowScroll();
  };

  const onForwardClick = () => {
    forwardDialogDiv.current.classList.remove('hidden');
    forwardDialogRef.current.classList.remove('translate-y-full');
    // document.body.style.overflow = 'hidden';
    blockScroll();
  };
  const onForwardCloseClick = () => {
    forwardDialogDiv.current.classList.add('hidden');
    forwardDialogRef.current.classList.add('translate-y-full');
    // document.body.style.overflow = 'unset';
    allowScroll();
  };

  const onProfileClick = () => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="mt-5 grid grid-flow-row bg-white p-4 rounded-3xl w-full">
      <div className="flex justify-start items-center w-fit ">
        <img
          src={profile ? profile : profilePlaceholder}
          alt=""
          onClick={onProfileClick}
          className="w-circleImage h-circleImage rounded-full bg-gray-100 object-cover cursor-pointer "
        />
        <div className="text-gray-900 focus:outline-none w-full text-sm mx-2 ">
          <p className="font-medium cursor-pointer" onClick={onProfileClick}>
            {username ? username : 'username'}
          </p>{' '}
          <p className="text-xs font-thin">uploaded {date ? `on ${date}` : 'now'}</p>
        </div>
      </div>
      <div className={postText ? 'my-2' : 'hidden'}>
        <p>{postText}</p>
      </div>

      <div
        className={
          postImage
            ? 'flex justify-center items-start mt-2 center rounded-md mb-3 bg-gray-100 overflow-hidden'
            : 'hidden'
        }
      >
        <img style={{ height: '50vh' }} src={postImage} alt="post" className="object-fill" />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center w-1/4">
          <i
            ref={likeRef}
            className="fa-regular fa-heart fa-lg active:scale-75 ease-in-out duration-200 cursor-pointer"
            onClick={onLikeClick}
          ></i>
          <i onClick={onCommentClick} className="fa-regular fa-comment fa-lg cursor-pointer"></i>
          <img onClick={onForwardClick} src={shareIcon} alt="share" className="size-5 cursor-pointer" />
        </div>
        <div>
          <i
            ref={saveRef}
            onClick={onSaveClick}
            className="fa-regular fa-bookmark fa-lg active:scale-75 ease-in-out duration-200 cursor-pointer"
          ></i>
        </div>
      </div>
      <p className="text-sm py-2">11,111 likes</p>
      <p onClick={onCommentClick} className="text-gray-700 font-thin my-2 cursor-pointer w-fit ">
        View all comments
      </p>
      <hr className="h-px bg-gray-200 border-0" />
      <div className="flex justify-between items-center">
        <input
          alt="post-data"
          type="text"
          name="post-data"
          id="comment-textarea"
          placeholder="Add a comment"
          onChange={onCommentChange}
          className="text-gray-900 focus:outline-none w-full text-sm font-medium py-2.5"
        ></input>
        {postButtonVisible && <p className="text-primaryColor font-bold cursor-pointer">Post</p>}
      </div>
      {/* comment dialogbox */}
      <div className="z-10">
        <div
          onClick={onCommentCloseClick}
          style={{ background: 'rgba(0,0,0,0.2)' }}
          className="fixed left-0 top-0 h-full w-full hidden"
          ref={commentsDialogDiv}
        ></div>
        <div
          ref={commentsDialogRef}
          className="p-10 h-full ease-in-out duration-300 translate-y-full w-1/3 z-20 fixed left-1/2 -translate-x-1/2 top-0"
        >
          <Comments onCloseClick={onCommentCloseClick} postId={postId} />
        </div>
      </div>
      {/* forward dialog box */}
      <div className="z-10">
        <div
          onClick={onForwardCloseClick}
          style={{ background: 'rgba(0,0,0,0.2)' }}
          className="fixed left-0 top-0 h-full w-full hidden"
          ref={forwardDialogDiv}
        ></div>
        <div
          ref={forwardDialogRef}
          className="p-10 h-full ease-in-out duration-300 translate-y-full w-1/3 z-20 fixed left-1/2 -translate-x-1/2 top-0"
        >
          <ShareList onCloseClick={onForwardCloseClick} friends={friends} />
        </div>
      </div>
    </div>
  );
};

export default Post;
