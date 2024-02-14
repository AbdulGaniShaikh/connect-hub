import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom/dist';
import ProfileSection from 'components/home/profile/ProfileSection';
import DescriptionSection from 'components/home/profile/DescriptionSection';
import { userService, toastService } from './../service';
import { HttpStatusCode } from 'axios';
import UserPosts from 'components/shared/UserPosts';
import ProfileSkeleton from 'components/skeletons/ProfileSkeleton';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './../redux/slices/userInfoSlice';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [relation, setRelation] = useState('NONE');
  const { userId } = useSelector(selectUserInfo);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    userService
      .getUser(id)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setUser(res.data.payload);
          setLoading(false);
        }
      })
      .catch((error) => {
        navigate('/profile');
        toastService.error(error.response.data.message);
      });
    userService
      .getMyRelation(userId, id)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setRelation(res.data.payload);
        }
      })

      .catch(() => {});
  }, [id]);

  return (
    <div className="px-5 w-full pb-5 grid grid-flow-row gap-y-5">
      {loading && <ProfileSkeleton />}
      <ProfileSection isVisitingProfile={true} user={user} relation={relation} visitorId={userId} />
      <DescriptionSection isVisitingProfile={true} user={user} />
      <UserPosts user={user} />
    </div>
  );
};

export default User;
