import { Link } from 'react-router-dom';
const NavbarRightIcon = (props) => {
  const { to, icon, onlyForMobile } = props;
  var className = 'flex items-center justify-center ml-5 size-10 bg-gray-100 rounded-full ';
  if (onlyForMobile) {
    className += ' hidden max-sm:flex';
  }
  return (
    <div className={className}>
      <Link to={to}>
        <i class={icon}></i>
      </Link>
    </div>
  );
};

export default NavbarRightIcon;
