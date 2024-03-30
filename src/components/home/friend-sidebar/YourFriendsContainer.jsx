import { useEffect, useState } from 'react';
import UserProfileRectangle from 'components/home/friend-sidebar/UserProfileRectangle';
import { useNavigate } from 'react-router-dom';
import { friendService } from 'service';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../../../redux/slices/userInfoSlice';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { HttpStatusCode } from 'axios';
import useErrorBehavior from 'hooks/useErrorBehavior';
import Divider from 'components/shared/Divider';

const YourFriendsContainer = () => {
  const [friendsList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector(selectUserInfo);
  const defaultErrorBehavior = useErrorBehavior();

  const navigate = useNavigate();
  const onViewAllFriendsClick = () => {
    navigate(`/users/${userId}/friends`);
  };

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const res = await friendService.getFriends(userId, 0, 3);
      if (res.status === HttpStatusCode.Ok) {
        setFriendList(res.data.content);
      }
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchFriends();
  }, [userId]);

  return (
    <div className="grid gap-y-3 flow-row p-5">
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
      <p onClick={onViewAllFriendsClick} className="place-self-center text-primaryColor font-medium cursor-pointer">
        View all friends
      </p>
    </div>
  );
};

export default YourFriendsContainer;
