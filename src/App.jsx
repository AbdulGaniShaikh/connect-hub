import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/auth/Login';
import SignUp from './views/auth/SignUp';
import Home from './views/home/Home';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
