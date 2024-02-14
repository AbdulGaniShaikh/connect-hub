import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom/dist';
import { useDispatch } from 'react-redux';
import profileDefault from './../../../assets/icons/user.svg';
import { updateCoverImageId, updateProfileImageId } from './../../../redux/slices/userInfoSlice';
import { authService, friendService, toastService, userService } from './../../../service';
import { HttpStatusCode } from 'axios';
import { imageUrl } from './../../../global';
import Spinner from 'components/shared/Spinner';

const ProfileSection = (props) => {
  const { user, relation, visitorId } = props;
  const [isVisitingProfile, setIdVisiting] = useState(props.isVisitingProfile);
  const dispatch = useDispatch();
  const [relation1, setRelation] = useState('NONE');

  const coverInpRef = useRef(null);
  const pfpInpRef = useRef(null);

  useEffect(() => {
    if (!user.userId) return;
    if (!visitorId) return;
    if (user.userId === visitorId) {
      setRelation('SELF');
      setIdVisiting(false);
    }
    console.log(`og ${user.userId} & visitor Id ${visitorId}`);
    setRelation(relation);
  }, [relation, user, visitorId]);

  const onCoverInputChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      userService
        .updateCover(user.userId, image)
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            dispatch(updateCoverImageId(res.data.payload));
            toastService.success('cover image sucessfully updated');
          }
        })
        .catch((error) => {
          toastService.error(error.response.data.message);
        });
    }
  };

  const onPfpInputChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      userService
        .updateProfile(user.userId, image)
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            dispatch(updateProfileImageId(res.data.payload));
            toastService.success('profile sucessfully updated');
          }
        })
        .catch((error) => {
          toastService.error(error.response.data.message);
        });
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
            className="w-full h-full object-cover"
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
            className="cover-photo relative inline-block bg-gray-100 h-32 w-32 rounded-full overflow-hidden cursor-pointer "
          >
            <img
              src={user.profileImageId ? `${imageUrl}/${user.profileImageId}` : profileDefault}
              alt=""
              className="w-full h-full object-cover"
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
          <p className="text-xl font-medium">{user.username}</p>
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
            <RelationNone setRelation={setRelation} visitorId={visitorId} userId={user.userId} />
          )}
          {relation1 === 'FRIENDS' && (
            <RelationFriend setRelation={setRelation} visitorId={visitorId} userId={user.userId} />
          )}
          {relation1 === 'FR_RECEIVED' && (
            <RelationFRRecieved setRelation={setRelation} visitorId={visitorId} userId={user.userId} />
          )}
          {relation1 === 'FR_SENT' && (
            <RelationFRSent setRelation={setRelation} visitorId={visitorId} userId={user.userId} />
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
  const addFriend = () => {
    setLoading(true);
    friendService
      .sendFriendRequest(visitorId, userId)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setRelation('FR_SENT');
        }
        toastService.success('Friend Request was sent successfully');
      })
      .catch((error) => {
        toastService.error(error.response.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
  const { setRelation, userId, visitorId } = props;
  const [loading, setLoading] = useState(false);
  const unsendRequest = () => {
    setLoading(true);
    friendService
      .deleteFriendRequest(visitorId, userId)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setRelation('NONE');
        }
        toastService.success('Deleted friend request');
      })
      .catch((error) => {
        toastService.error(error.response.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
  const { setRelation, userId, visitorId } = props;
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const acceptClick = () => {
    setAcceptLoading(true);
    friendService
      .acceptFriendRequest(userId, visitorId)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setRelation('FRIENDS');
        }
        toastService.success('accepted friend request');
      })
      .catch((error) => {
        toastService.error(error.response.data?.message);
      })
      .finally(() => {
        setAcceptLoading(false);
      });
  };
  const rejectClick = () => {
    setRejectLoading(true);
    friendService
      .rejectFriendRequest(userId, visitorId)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setRelation('NONE');
        }
        toastService.success('Rejected friend request');
      })
      .catch((error) => {
        toastService.error(error.response.data?.message);
      })
      .finally(() => {
        setRejectLoading(false);
      });
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

  const unfriend = () => {
    setLoading(true);
    friendService
      .unfriend(visitorId, userId)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setRelation('NONE');
        }
        toastService.success('Unfriended');
      })
      .catch((error) => {
        toastService.error(error.response.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
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

const RelationSelf = (props) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-x-3 w-1/2 self-end mt-3">
      <button className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4  ring-gray-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center">
        <Link to="/saved">Saved Posts</Link>
      </button>

      <button
        onClick={() => {
          authService
            .logout()
            .then(() => {
              navigate('/login');
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2 text-center"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileSection;
