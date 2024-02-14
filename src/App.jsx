import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/auth/Login';
import SignUp from './views/auth/SignUp';
import Home from './views/Home';
import MainContent from 'components/home/MainContent';
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

const App = () => {
  return (
    <div className="">
      <SkeletonTheme>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-account/:email" element={<VerifyAccount />} />
            <Route path="/unverified-account" element={<UnverifiedAccount />} />
            <Route path="" element={<Home />}>
              <Route path="" element={<MainContent />} />
              <Route path="profile" element={<Profile />} />
              <Route path="/users/:id/friends" element={<Friends />} />
              <Route path="friend-requests" element={<FriendRequests />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/inbox/:id" element={<Chat />} />
              <Route path="/search" element={<Search />} />
              <Route path="/saved" element={<SavedPosts />} />
            </Route>
            <Route path="*" element={<h1>Page Not available</h1>} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
};

export default App;
