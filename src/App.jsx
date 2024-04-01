import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from 'views/auth/Login';
import SignUp from 'views/auth/SignUp';
import ProtectedRoutes from 'views/ProtectedRoutes';
import Home from 'components/home/Home';
import Profile from 'components/home/profile/Profile';
import Friends from 'views/Friends';
import User from 'views/User';
import FriendRequests from 'views/FriendRequests';
import Inbox from 'views/Inbox';
import Chat from 'views/Chat';
import Search from 'views/Search';
import SavedPosts from 'views/SavedPosts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ForgotPassword from 'views/ForgotPassword';
import VerifyAccount from 'views/VerifyAccount';
import UnverifiedAccount from 'views/UnverifiedAccount';
import ChangePassword from 'views/ChangePassword';
import NotFound from 'views/NotFound';
import PostWithComment from 'views/PostWithComment';
import { useDispatch, useSelector } from 'react-redux';
import { selectServerStatus, setStatus } from './redux/slices/serverStatus';
import { useEffect, useState } from 'react';
import { userService } from 'service';
import ServerDown from 'views/ServerDown';
import PageLoading from 'components/shared/PageLoading';
import PublicRoutes from 'views/PublicRoutes';

const App = () => {
  const dispatch = useDispatch();
  const serverStatus = useSelector(selectServerStatus);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        setPageLoading(true);
        const res = await userService.fetchServerStatus();
        dispatch(setStatus(res.data));
      } catch (error) {
        const res = error.response;
        if (!res) {
          dispatch(setStatus('DOWN'));
          return;
        }
      } finally {
        setPageLoading(false);
      }
    };
    fetchServerStatus();
  }, []);

  return (
    <div>
      <SkeletonTheme>
        <ToastContainer />
        <PageLoading loading={pageLoading}>
          <BrowserRouter>
            <Routes>
              {serverStatus !== 'RUNNING' && <Route path="*" element={<ServerDown />} />}
              {serverStatus === 'RUNNING' && (
                <>
                  <Route path="auth" element={<PublicRoutes />}>
                    <Route path="login" element={<Login />} />
                    <Route path="sign-up" element={<SignUp />} />
                  </Route>
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route path="verify-account/:email" element={<VerifyAccount />} />
                  <Route path="" element={<ProtectedRoutes />}>
                    <Route path="" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="/users/:id/friends" element={<Friends />} />
                    <Route path="friend-requests" element={<FriendRequests />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/inbox/:id" element={<Chat />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/saved" element={<SavedPosts />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/posts/:postId" element={<PostWithComment />} />
                    <Route path="unverified-account" element={<UnverifiedAccount />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
        </PageLoading>
      </SkeletonTheme>
    </div>
  );
};

export default App;
