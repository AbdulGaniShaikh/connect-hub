import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom/dist';
import { useDispatch } from 'react-redux';
import {
  decrementTotalFriendsCount,
  incrementTotalFriendsCount,
  updateCoverImageId,
  updateProfileImageId
} from './../../../redux/slices/userInfoSlice';
import { friendService, toastService, userService } from 'service';
import { HttpStatusCode } from 'axios';
import { imageUrl } from 'global';
import useLogout from 'hooks/useLogout';
import useErrorBehavior from 'hooks/useErrorBehavior';
import imageCompressor from 'utility/imageCompressor';
import ProfileImage from 'components/shared/ProfileImage';
import Button from 'components/buttons/Button';
import NegativeButton from 'components/buttons/NegativeButton';
import NeutralButton from 'components/buttons/NeutralButton';
import PositiveButton from 'components/buttons/PositiveButton';
import { flipFlag, removeRequest } from './../../../redux/slices/friendRequestsSlice';

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
        const compressed = await imageCompressor(image, 0.6);
        const res = await userService.updateCover(user.userId, compressed);
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
        const compressed = await imageCompressor(image, 0.2);
        const res = await userService.updateProfile(user.userId, compressed);
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
    <div className="rounded-3xl   px-5 pb-5 flex flex-col gap-y-5">
      {!isVisitingProfile && (
        <div>
          <input
            ref={coverInpRef}
            accept="image/*"
            className="hidden"
            type="file"
            onChange={onCoverInputChange}
            multiple={false}
          />
          <input
            ref={pfpInpRef}
            accept="image/*"
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
      <div className="grid grid-flow-row -mt-20 gap-3">
        <div className="flex overflow-hidden justify-center items-center">
          <div
            onClick={() => {
              if (!isVisitingProfile) pfpInpRef.current.click();
            }}
            ref={profileImageRef}
            className="cover-photo relative inline-block bg-gray-100 h-32 w-32 rounded-full overflow-hidden cursor-pointer "
          >
            <ProfileImage id={user.profileImageId} height="full" width="full" />
            {!isVisitingProfile && (
              <div className="show-when-hover backdrop-blur-sm top-0 absolute h-full w-full bg-hoverGray hidden"></div>
            )}
            {!isVisitingProfile && (
              <i className="fa-regular fa-edit text-gray-800 fa-lg show-when-hover absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 hidden"></i>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-xl tooltip-container font-medium tooltip inline-block relative">
            {user.username}{' '}
            {user.verified && <i className="fa-solid fa-certificate text-blue-500 text-sm text-center"></i>}
            <span className="text-gray-50 tooltip invisible px-2 py-1 rounded-md absolute bottom-full left-1/2 text-xs bg-black select-none">
              {user.verified ? 'Verified' : 'Unverified'}
            </span>
          </p>
          <p className="">{user.email}</p>
        </div>
        <div className="grid grid-flow-col">
          <div className="flex flex-col justify-center items-center">
            <p className="text-md font-medium">Posts</p>
            <p className="">{user.totalPost}</p>
          </div>

          <Link to={`/users/${user.userId}/friends`} className="flex flex-col justify-center items-center">
            <p className="text-md font-medium">Friends</p>
            <p className="">{user.totalFriends}</p>
          </Link>
        </div>
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
    <div className="flex gap-x-3 w-full sm:w-1/2 justify-end self-end ">
      <div className="w-1/2">
        <Button onClick={addFriend} text="Add friend" loading={loading} icon="fa-solid fa-user-plus" />
      </div>
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
    <div className="flex gap-x-3 w-1/2 sm:w-1/4 justify-end self-end ">
      <NegativeButton onClick={unsendRequest} loading={loading} text="Cancel request" />
    </div>
  );
};

const RelationFRRecieved = (props) => {
  const { setRelation, friendRequestId } = props;
  const dispatch = useDispatch();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const defaultErrorBehavior = useErrorBehavior();

  const acceptClick = async () => {
    setAcceptLoading(true);
    try {
      await friendService.acceptFriendRequest(friendRequestId);
      setRelation('FRIENDS');
      toastService.success('Accepted friend request');
      dispatch(removeRequest(friendRequestId));
      dispatch(incrementTotalFriendsCount());
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
      dispatch(removeRequest(friendRequestId));
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <div className="flex gap-x-3 w-full sm:w-1/2 self-end ">
      <NegativeButton onClick={rejectClick} loading={rejectLoading} text="Reject" />
      <PositiveButton onClick={acceptClick} loading={acceptLoading} text="Accept" />
    </div>
  );
};

const RelationFriend = (props) => {
  const { setRelation, userId, visitorId } = props;
  const [loading, setLoading] = useState(false);
  const defaultErrorBehavior = useErrorBehavior();
  const dispatch = useDispatch();

  const unfriend = async () => {
    setLoading(true);
    try {
      await friendService.unfriend(visitorId, userId);
      setRelation('NONE');
      dispatch(decrementTotalFriendsCount());
      dispatch(flipFlag());
      toastService.success('Unfriended');
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-x-3 w-full sm:w-1/2 self-end ">
      <Link to={'/inbox/' + userId} className="w-full">
        <NeutralButton text="Message" />
      </Link>
      <div className="w-full">
        <NegativeButton onClick={unfriend} text="Unfriend" loading={loading} />
      </div>
    </div>
  );
};

const RelationSelf = () => {
  const [logout] = useLogout();

  return (
    <div className="flex gap-x-3 w-full sm:w-1/2 self-end">
      <Link to="/saved" className="w-full">
        <NeutralButton text="Saved Posts" />
      </Link>
      <div className="w-full">
        <NegativeButton onClick={logout} text="Logout" />
      </div>
    </div>
  );
};

export default ProfileSection;
