import { Link } from 'react-router-dom';
import navbarIconData from './navbarIconData';
import NavbarRightIcon from './NavbarRightIcon';

const Navbar = (props) => {
  return (
    <nav className="fixed top-0 left-0 bg-white w-full py-2.5 border-b-2 border-gray-200 px-40">
      <div className="px-5 grid grid-cols-3 max-sm:grid-cols-2 justify-between items-center ">
        <div className="flex items-center">
          <Link to="/home" className="flex items-center gap-3">
            <img src="logo.svg" alt="logo" className="size-7" />
            <h1 className="text-2xl">ConnectHub</h1>
          </Link>
        </div>

        <div className="flex items-center px-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 ring-red-100 focus:border-transparent focus:outline-none hover:ring-4 ease-linear duration-200 max-sm:hidden">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            alt="search"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="px-3 py-2.5 focus:outline-none w-full"
          />
        </div>

        <div className="flex justify-self-end items-center">
          {navbarIconData.map((item, index) => (
            <NavbarRightIcon {...item} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
