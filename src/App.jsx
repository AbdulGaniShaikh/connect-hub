import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/auth/Login';
import SignUp from './views/auth/SignUp';
import Home from './views/home/Home';
import MainContent from 'components/home/MainContent';
import Profile from 'components/home/profile/Profile';
import Friends from 'views/Friends';
import User from 'views/User';
import FriendRequests from 'views/FriendRequests';
import Counter from 'views/Counter';
import Inbox from 'views/Inbox';
import Chat from 'views/Chat';
import Search from 'views/Search';
import SavedPosts from 'views/SavedPosts';

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="" element={<Home />}>
            <Route path="" element={<MainContent />} />
            <Route path="profile" element={<Profile />} />
            <Route path="all-friends" element={<Friends />} />
            <Route path="friend-requests" element={<FriendRequests />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/inbox/:id" element={<Chat />} />
            <Route path="/search" element={<Search />} />
            <Route path="/saved" element={<SavedPosts />} />
          </Route>
          <Route path="/counter" element={<Counter />} />
          <Route path="*" element={<h1>Page Not available</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
