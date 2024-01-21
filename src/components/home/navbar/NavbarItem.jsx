import { Link } from 'react-router-dom';

const NavbarItem = (props) => {
  const { to, showOnMobile, icon } = props;
  return (
    <div className={'mx-5 hidden ' + showOnMobile ? 'max-sm:flex' : ''}>
      <Link to={to}>
        <i class={icon}></i>
      </Link>
    </div>
  );
};

export default NavbarItem;
