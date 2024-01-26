import { useRef, useState } from 'react';
import cover from './../../../assets/profile.jpg';
import { Link, useNavigate } from 'react-router-dom/dist';

const ProfileSection = (props) => {
  const { id } = props;
  const coverInpRef = useRef(null);
  const pfpInpRef = useRef(null);
  const { isVisitingProfile } = props;
  const navigate = useNavigate();

  const [coverImage, setCoverImage] = useState(cover);
  const [pfpImage, setPfpImage] = useState('https://api.multiavatar.com/Binx%20Bond.png');

  const onCoverInputChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      setCoverImage(URL.createObjectURL(image));
    }
  };

  const onPfpInputChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      setPfpImage(URL.createObjectURL(image));
    }
  };

  const messageUser = () => {
    navigate(`/inbox/${id}`);
  };

  const addFriend = () => {};

  return (
    <div className="rounded-3xl bg-white px-5 pb-5 flex flex-col gap-y-5">
      {!isVisitingProfile && (
        <div>
          <input
            ref={coverInpRef}
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            type="file"
            onChange={onCoverInputChange}
            multiple="false"
          />
          <input
            ref={pfpInpRef}
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            type="file"
            onChange={onPfpInputChange}
            multiple="false"
          />
        </div>
      )}
      {isVisitingProfile && <div></div>}

      <div
        onClick={() => {
          if (!isVisitingProfile) coverInpRef.current.click();
        }}
        className="cover-photo relative inline-block bg-gray-100 h-52 w-full rounded-md overflow-hidden cursor-pointer "
      >
        <img src={coverImage} alt="" className="w-full h-full object-cover" />
        {!isVisitingProfile && (
          <div className="show-when-hover backdrop-blur-sm top-0 absolute h-full w-full bg-hoverGray hidden"></div>
        )}
        {!isVisitingProfile && (
          <i className="fa-regular fa-edit text-gray-800 fa-xl show-when-hover absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 hidden"></i>
        )}
      </div>
      <div className="grid grid-flow-col gap-5 ">
        <div className="ml-3 absolute -translate-y-1/2 overflow-hidden">
          <div
            onClick={() => {
              if (!isVisitingProfile) pfpInpRef.current.click();
            }}
            className="cover-photo relative inline-block bg-gray-100 h-32 w-32 rounded-full overflow-hidden cursor-pointer "
          >
            <img src={pfpImage} alt="" className="w-full h-full object-cover" />
            {!isVisitingProfile && (
              <div className="show-when-hover backdrop-blur-sm top-0 absolute h-full w-full bg-hoverGray hidden"></div>
            )}
            {!isVisitingProfile && (
              <i className="fa-regular fa-edit text-gray-800 fa-lg show-when-hover absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 hidden"></i>
            )}
          </div>
        </div>

        <div className="ml-36">
          <p className="text-xl font-medium">Abdul Gani Shaikh</p>
          <p className="">@somthinf</p>
        </div>
        <div className="flex flex-col justify-center items-start">
          <p className="text-md font-medium">Posts</p>
          <p className="">10</p>
        </div>

        <Link to="/all-friends" className="flex flex-col justify-center items-start">
          <p className="text-md font-medium">Friends</p>
          <p className="">10</p>
        </Link>
      </div>
      {isVisitingProfile && (
        <div className="flex gap-x-3 w-1/2 self-end mt-3">
          <button
            onClick={messageUser}
            className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4  ring-gray-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center"
          >
            Message
          </button>
          <button
            onClick={addFriend}
            className="text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center"
          >
            Add Friend
          </button>
        </div>
      )}

      {!isVisitingProfile && (
        <div className="flex gap-x-3 w-1/2 self-end mt-3">
          <button className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4  ring-gray-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center">
            <Link to="/saved">Saved Posts</Link>
          </button>

          <button className="text-white bg-red-500 hover:bg-red-600 focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center">
            <Link to="/login">Logout</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
