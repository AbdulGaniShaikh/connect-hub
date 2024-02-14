import { useEffect, useState } from 'react';
import NewPost from '../NewPost';
import { selectUserInfo } from './../../../redux/slices/userInfoSlice';
import ProfileSection from './ProfileSection';
import DescriptionSection from './DescriptionSection';
import { useSelector } from 'react-redux';
import UserPosts from 'components/shared/UserPosts';
import ProfileSkeleton from 'components/skeletons/ProfileSkeleton';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const user1 = useSelector(selectUserInfo);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setUser(user1);
    setLoading(false);
  }, [user1]);
  return (
    <div className="px-5 w-full pb-5 grid grid-flow-row gap-y-5">
      {loading && <ProfileSkeleton />}
      <ProfileSection user={user} />
      <DescriptionSection user={user} />
      <NewPost user={user} />
      <UserPosts user={user} />
    </div>
  );
};

export default Profile;
