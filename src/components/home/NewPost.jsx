import { useEffect, useRef, useState } from 'react';
import { incrementTotalPostsCount, selectUserInfo } from './../../redux/slices/userInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import close from 'assets/icons/close.svg';
import gallery from 'assets/icons/image.svg';
import { imageUrl } from 'global';
import profileDefault from 'assets/icons/user.svg';
import { postService, toastService } from 'service';
import { HttpStatusCode } from 'axios';
import Spinner from 'components/shared/Spinner';
import useErrorBehavior from 'hooks/useErrorBehavior';
import imageCompressor from 'utility/imageCompressor';
import ProfileImage from 'components/shared/ProfileImage';

const NewPost = () => {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imageToDisplay, setImageToDisplay] = useState(null);
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  const uploadedImageRef = useRef(null);
  const [val, setVal] = useState('');
  const [loading, setLoading] = useState(false);
  const defaultErrorBehavior = useErrorBehavior();

  const uploadNewPost = async () => {
    if (!image && val.trim() === '') {
      toastService.error('image and text cannot be empty');
      return;
    }
    setLoading(true);
    try {
      var compressed = null;
      if (image) {
        compressed = await imageCompressor(image, 0.6);
      }
      const res = await postService.uploadNewPost(user.userId, compressed, val);
      if (res.status === HttpStatusCode.Ok) {
        toastService.success('Post uploaded successfully');
        setVal('');
        removeImage();
        dispatch(incrementTotalPostsCount());
      }
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setVal(e.target.value);
  };

  const removeImage = () => {
    uploadedImageRef.current.classList.add('hidden');
    fileInputRef.current.value = null;
    setImage(null);
    setImageToDisplay(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageToDisplay(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
      uploadedImageRef.current.classList.remove('hidden');
    } else {
      if (!image) uploadedImageRef.current.classList.add('hidden');
    }
  };
  const onUploadImageClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, [val]);
  return (
    <div className="grid grid-flow-row bg-white p-4 rounded-3xl">
      <input
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        type="file"
        onChange={handleFileChange}
        multiple={false}
      />

      <div className="text-sm font-medium">
        <p>Post something</p>
      </div>
      <hr className="h-px my-2.5 bg-gray-200 border-0 dark:bg-gray-200" />
      <div className="flex justify-start items-start w-full ">
        <ProfileImage id={user.profileImageId} key={1} />

        <textarea
          alt="post-data"
          type="text"
          name="post-data"
          id="post-data"
          value={val}
          onChange={onChange}
          placeholder="What's on you mind?"
          className="text-gray-900 min-h-10 focus:outline-none flex-1 text-sm mx-2 p-2.5 resize-none"
          ref={textAreaRef}
        ></textarea>
        <div className="active:scale-95 ease-in-out duration-150 flex justify-center items-center size-10 cursor-pointer">
          <img src={gallery} alt="upload" onClick={onUploadImageClick} />
        </div>
      </div>
      <div
        className="relative justify-center items-start mt-2 center rounded-md bg-gray-100 hidden"
        ref={uploadedImageRef}
      >
        <img
          src={close}
          alt="close"
          className="absolute top-0 right-0 size-4 m-1 cursor-pointer bg-gray-100 rounded-full"
          onClick={removeImage}
        />
        <img src={imageToDisplay} alt="" style={{ height: '50vh' }} className="m-auto object-cover" />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium mt-2 rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center"
        onClick={uploadNewPost}
      >
        {loading && <Spinner />}
        Post
      </button>
    </div>
  );
};

export default NewPost;
