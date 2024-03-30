import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import ProfileSection from 'components/home/profile/ProfileSection';
import DescriptionSection from 'components/home/profile/DescriptionSection';
import { userService } from 'service';
import UserPosts from 'components/shared/UserPosts';
import ProfileSkeleton from 'components/skeletons/ProfileSkeleton';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../redux/slices/userInfoSlice';
import useErrorBehavior from 'hooks/useErrorBehavior';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [relation, setRelation] = useState('NONE');
  const [friendRequestId, setFriendRequestId] = useState('');
  const { userId } = useSelector(selectUserInfo);
  const defaultErrorBehavior = useErrorBehavior();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        var res = await userService.getUser(id);
        setUser(res.data.payload);
        setLoading(false);

        var res2 = await userService.getMyRelation(userId, id);
        setRelation(res2.data.payload.relation);
        setFriendRequestId(res2.data.payload.friendRequestId);
      } catch (error) {
        defaultErrorBehavior(error);
      }
    };
    if (!id) return;
    if (!userId) return;
    fetch();
  }, [id, userId]);

  return (
    <div className="w-full grid grid-flow-row gap-y-5">
      {loading && <ProfileSkeleton />}
      <ProfileSection
        isVisitingProfile={true}
        user={user}
        friendRequestId={friendRequestId}
        relation={relation}
        visitorId={userId}
      />
      <DescriptionSection isVisitingProfile={true} user={user} />
      <UserPosts user={user} />
    </div>
  );
};

export default User;
