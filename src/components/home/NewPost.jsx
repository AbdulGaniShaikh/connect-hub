import { useEffect, useRef, useState } from 'react';
import close from './../../assets/icons/close.svg';
import gallery from './../../assets/icons/image.svg';
import user from './../../assets/profile.jpg';

const NewPost = () => {
  const [image, setImage] = useState(null);
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  const uploadedImageRef = useRef(null);
  const [val, setVal] = useState('');
  const onChange = (e) => {
    setVal(e.target.value);
  };

  const removeImage = () => {
    uploadedImageRef.current.classList.add('hidden');
    console.log(fileInputRef.current.value);
    fileInputRef.current.value = null;
    setImage(null);
  };

  const handleFileChange = (e) => {
    console.log('readfile');
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
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
        accept="image/png, image/jpeg, image/gif"
        className="hidden"
        type="file"
        onChange={handleFileChange}
        multiple="false"
      />

      <div className="text-sm font-medium">
        <p>Post something</p>
      </div>
      <hr className="h-px my-2.5 bg-gray-200 border-0 dark:bg-gray-200" />
      <div className="flex justify-start items-start w-full ">
        <img src={user} alt="" className="w-circleImage h-circleImage rounded-full bg-gray-100 object-cover" />
        <textarea
          alt="post-data"
          type="text"
          name="post-data"
          id="post-data"
          value={val}
          onChange={onChange}
          placeholder="What's on you mind?"
          className="text-gray-900 min-h-10 focus:outline-none w-full text-sm mx-2 p-2.5 resize-none"
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
        <img src={image} alt="" style={{ height: '50vh' }} className="m-auto object-cover" />
      </div>
      <button
        type="submit"
        className="text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium mt-2 rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center"
      >
        Post
      </button>
    </div>
  );
};

export default NewPost;
