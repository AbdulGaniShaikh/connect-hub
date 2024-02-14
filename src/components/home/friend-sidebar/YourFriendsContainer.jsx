import { useEffect, useState } from 'react';
import UserProfileRectangle from './UserProfileRectangle';
import { useNavigate } from 'react-router-dom';
import { friendService, toastService } from 'service';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../../../redux/slices/userInfoSlice';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { HttpStatusCode } from 'axios';

const YourFriendsContainer = () => {
  const [friendsList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector(selectUserInfo);

  const navigate = useNavigate();
  const onViewAllFriendsClick = () => {
    navigate(`/users/${userId}/friends`);
  };

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    friendService
      .getFriends(userId, 0, 3)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setFriendList(res.data.content);
        }
      })
      .catch((error) => {
        toastService.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="grid gap-y-3 flow-row bg-white rounded-3xl p-5">
      <h1 className="font-medium">Your friends</h1>
      <div className="grid flow-row ">
        {friendsList.map((friend) => (
          <UserProfileRectangle key={friend.userId} {...friend} />
        ))}
        {loading && (
          <>
            <UserCardSkeleton />
            <UserCardSkeleton />
          </>
        )}
        {!loading && friendsList.length === 0 && <div className="text-sm">You don't have any friends</div>}
      </div>
      <hr />
      <p onClick={onViewAllFriendsClick} className="place-self-center text-primaryColor font-medium cursor-pointer">
        View all friends
      </p>
    </div>
  );
};

export default YourFriendsContainer;
