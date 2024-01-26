import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav className="z-10 fixed top-0 left-0 bg-white w-full py-2.5 border-b-2 border-gray-200 xl:px-40">
      <div className="px-5 grid grid-cols-2 max-sm:grid-cols-2 justify-between items-center ">
        <div className="flex items-center">
          <Link to="" className="flex items-center gap-3">
            <img src="logo.svg" alt="logo" className="size-7" />
            <h1 className="text-2xl">ConnectHub</h1>
          </Link>
        </div>

        <div className="flex justify-self-end gap-x-10 items-center">
          <Link to="/search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
          <Link to="/login">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </Link>
          <Link to="/inbox">
            <i className="fa-regular fa-message"></i>
          </Link>
          <Link to="profile">
            <img src="logo512.png" alt="profile" className="h-circleImage w-circleImage object-cover" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
