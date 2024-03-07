import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom/dist';
import { useDispatch } from 'react-redux';
import profileDefault from 'assets/icons/user.svg';
import { updateCoverImageId, updateProfileImageId } from './../../../redux/slices/userInfoSlice';
import { friendService, toastService, userService } from 'service';
import { HttpStatusCode } from 'axios';
import { imageUrl } from 'global';
import Spinner from 'components/shared/Spinner';
import { verified } from 'assets/icons';
import useLogout from 'hooks/useLogout';
import useErrorBehavior from 'hooks/useErrorBehavior';

const ProfileSection = (props) => {
  const coverImgRef = useRef(null);
  const profileImageRef = useRef(null);
  const { user, relation, visitorId, friendRequestId } = props;
  const [isVisitingProfile, setIdVisiting] = useState(props.isVisitingProfile);
  const dispatch = useDispatch();
  const [relation1, setRelation] = useState('NONE');
  const defaultErrorBehavior = useErrorBehavior();

  const coverInpRef = useRef(null);
  const pfpInpRef = useRef(null);

  const saveCursorPosition = function (cursorX, cursorY, ref) {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    let xPos = ((cursorX - left) / width) * 100;
    let yPos = ((cursorY - top) / height) * 100;
    document.documentElement.style.setProperty('--x', xPos + '%');
    document.documentElement.style.setProperty('--y', yPos + '%');
  };

  useEffect(() => {
    if (!user.userId) return;
    if (!visitorId) return;
    if (user.userId === visitorId) {
      setRelation('SELF');
      setIdVisiting(false);
    }
    setRelation(relation);
  }, [relation, user, visitorId]);

  const onCoverInputChange = async (event) => {
    const image = event.target.files[0];
    if (image) {
      try {
        const res = await userService.updateCover(user.userId, image);
        if (res.status === HttpStatusCode.Ok) {
          dispatch(updateCoverImageId(res.data.payload));
          toastService.success('cover image successfully updated');
        }
      } catch (error) {
        defaultErrorBehavior(error);
      }
    }
  };

  const onPfpInputChange = async (event) => {
    const image = event.target.files[0];
    if (image) {
      try {
        const res = await userService.updateProfile(user.userId, image);
        if (res.status === HttpStatusCode.Ok) {
          dispatch(updateProfileImageId(res.data.payload));
          toastService.success('profile successfully updated');
        }
      } catch (error) {
        defaultErrorBehavior(error);
      }
    }
  };

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
            multiple={false}
          />
          <input
            ref={pfpInpRef}
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            type="file"
            onChange={onPfpInputChange}
            multiple={false}
          />
        </div>
      )}
      {isVisitingProfile && <div></div>}

      <div
        ref={coverImgRef}
        onClick={() => {
          if (!isVisitingProfile) coverInpRef.current.click();
        }}
        className="cover-photo relative inline-block  bg-gradient-to-r from-red-700 to-purple-500 h-52 w-full rounded-md overflow-hidden cursor-pointer "
      >
        {user.coverImageId && (
          <img
            src={user.coverImageId ? `${imageUrl}/${user.coverImageId}` : null}
            alt="coverImage"
            onError={() => {
              this.style.display = 'none';
            }}
            onMouseMove={(e) => saveCursorPosition(e.clientX, e.clientY, coverImgRef)}
            className="w-full h-full zoom-on-mouse object-cover hover:scale-150 duration-100 ease-linear"
          />
        )}
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
            ref={profileImageRef}
            className="cover-photo relative inline-block bg-gray-100 h-32 w-32 rounded-full overflow-hidden cursor-pointer "
          >
            <img
              src={user.profileImageId ? `${imageUrl}/${user.profileImageId}` : profileDefault}
              alt=""
              onMouseMove={(e) => saveCursorPosition(e.clientX, e.clientY, profileImageRef)}
              className="w-full h-full zoom-on-mouse object-cover hover:scale-150 duration-100 ease-linear"
            />
            {!isVisitingProfile && (
              <div className="show-when-hover backdrop-blur-sm top-0 absolute h-full w-full bg-hoverGray hidden"></div>
            )}
            {!isVisitingProfile && (
              <i className="fa-regular fa-edit text-gray-800 fa-lg show-when-hover absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 hidden"></i>
            )}
          </div>
        </div>

        <div className="ml-36">
          <p className="text-xl tooltip-container font-medium tooltip inline-block relative">
            {user.username} {user.verified && <img src={verified} alt="" className="size-5 aspect-square inline" />}
            <span className="text-gray-50 tooltip invisible px-2 py-1 rounded-md absolute bottom-full left-1/2 text-xs bg-black select-none">
              {user.verified ? 'Verified' : 'Unverified'}
            </span>
          </p>
          <p className="">{user.email}</p>
        </div>
        <div className="flex flex-col justify-center items-start">
          <p className="text-md font-medium">Posts</p>
          <p className="">{user.totalPost}</p>
        </div>

        <Link to={`/users/${user.userId}/friends`} className="flex flex-col justify-center items-start">
          <p className="text-md font-medium">Friends</p>
          <p className="">{user.totalFriends}</p>
        </Link>
      </div>
      {isVisitingProfile && (
        <>
          {relation1 === 'NONE' && (
            <RelationNone
              setRelation={setRelation}
              friendRequestId={friendRequestId}
              visitorId={visitorId}
              userId={user.userId}
            />
          )}
          {relation1 === 'FRIENDS' && (
            <RelationFriend
              setRelation={setRelation}
              friendRequestId={friendRequestId}
              visitorId={visitorId}
              userId={user.userId}
            />
          )}
          {relation1 === 'FR_RECEIVED' && (
            <RelationFRRecieved
              setRelation={setRelation}
              friendRequestId={friendRequestId}
              visitorId={visitorId}
              userId={user.userId}
            />
          )}
          {relation1 === 'FR_SENT' && (
            <RelationFRSent
              setRelation={setRelation}
              friendRequestId={friendRequestId}
              visitorId={visitorId}
              userId={user.userId}
            />
          )}
        </>
      )}
      {!isVisitingProfile && <RelationSelf />}
    </div>
  );
};

const RelationNone = (props) => {
  const { setRelation, userId, visitorId } = props;
  const [loading, setLoading] = useState(false);
  const defaultErrorBehavior = useErrorBehavior();
  const addFriend = async () => {
    setLoading(true);
    try {
      const res = await friendService.sendFriendRequest(visitorId, userId);
      if (res.status === HttpStatusCode.Ok) {
        setRelation('FR_SENT');
      }
      toastService.success('Friend Request was sent successfully');
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-x-3 w-1/2 justify-end self-end mt-3">
      <button
        onClick={addFriend}
        className="flex justify-center items-center text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-1/2 px-5 py-2 text-center"
      >
        {loading && <Spinner />}
        {!loading && <i className="fa-solid fa-user-plus mr-2"></i>}
        Add Friend
      </button>
    </div>
  );
};

const RelationFRSent = (props) => {
  const { setRelation, friendRequestId } = props;
  const [loading, setLoading] = useState(false);
  const defaultErrorBehavior = useErrorBehavior();
  const unsendRequest = async () => {
    setLoading(true);
    try {
      await friendService.deleteFriendRequest(friendRequestId);

      setRelation('NONE');
      toastService.success('Deleted friend request');
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-x-3 w-1/2 justify-end self-end mt-3">
      <button
        onClick={unsendRequest}
        className="flex justify-center items-center text-white bg-red-500 hover:bg-red-600 focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-1/2 px-5 py-2 text-center"
      >
        {loading && <Spinner />}
        Cancel request
      </button>
    </div>
  );
};

const RelationFRRecieved = (props) => {
  const { setRelation, friendRequestId } = props;
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const defaultErrorBehavior = useErrorBehavior();

  const acceptClick = async () => {
    setAcceptLoading(true);
    try {
      await friendService.acceptFriendRequest(friendRequestId);
      setRelation('FRIENDS');
      toastService.success('Accepted friend request');
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setAcceptLoading(false);
    }
  };
  const rejectClick = async () => {
    setRejectLoading(true);
    try {
      await friendService.rejectFriendRequest(friendRequestId);
      setRelation('NONE');
      toastService.success('Rejected friend request');
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <div className="flex gap-x-3 w-1/2 self-end mt-3">
      <button
        onClick={rejectClick}
        className="flex justify-center items-center text-white bg-red-500 hover:bg-red-600 focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center"
      >
        {rejectLoading && <Spinner />}
        Reject
      </button>
      <button
        onClick={acceptClick}
        className="flex justify-center items-center text-white bg-green-500 hover:bg-green-600 focus:ring-4  ring-green-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center"
      >
        {acceptLoading && <Spinner />}
        Accept
      </button>
    </div>
  );
};

const RelationFriend = (props) => {
  const { setRelation, userId, visitorId } = props;
  const [loading, setLoading] = useState(false);
  const defaultErrorBehavior = useErrorBehavior();

  const unfriend = async () => {
    setLoading(true);
    try {
      await friendService.unfriend(visitorId, userId);
      setRelation('NONE');
      toastService.success('Unfriended');
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-x-3 w-1/2 self-end mt-3">
      <button className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4  ring-gray-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center">
        <Link to={'/inbox/' + userId}>Message</Link>
      </button>
      <button
        onClick={unfriend}
        className="flex justify-center items-center text-white bg-red-500 hover:bg-red-600 focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center"
      >
        {loading && <Spinner />}
        Unfriend
      </button>
    </div>
  );
};

const RelationSelf = () => {
  const [logout] = useLogout();

  return (
    <div className="flex gap-x-3 w-1/2 self-end mt-3">
      <button className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4  ring-gray-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center">
        <Link to="/saved">Saved Posts</Link>
      </button>

      <button
        onClick={logout}
        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileSection;
