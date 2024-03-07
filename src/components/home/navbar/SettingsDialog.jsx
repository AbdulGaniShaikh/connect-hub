import { close } from 'assets/icons';
import { Link } from 'react-router-dom';
import SettingsItem from 'components/home/navbar/SettingsItem';
import useLogout from 'hooks/useLogout';

const SettingsDialog = ({ onCloseClick = () => {}, userId = '' }) => {
  // const { onCloseClick } = props;
  const [logout] = useLogout();
  return (
    <div className="flex flex-col bg-white rounded-3xl p-5 overflow-hidden">
      <div className="grid gap-y-3 h-fit">
        <div className="flex justify-between items-start">
          <h1 className="font-medium justify-self-center">Settings</h1>
          <img src={close} alt="close" className="size-5 cursor-pointer" onClick={onCloseClick} />
        </div>
        <hr />
      </div>
      <div className="flex flex-col">
        <Link to="/inbox">
          <SettingsItem text="Inbox" onClick={onCloseClick} icon="fa-regular fa-message" />
        </Link>
        <Link to="/search">
          <SettingsItem text="Search" onClick={onCloseClick} icon="fa-solid fa-magnifying-glass" />
        </Link>
        <Link to="/saved">
          <SettingsItem text="Saved posts" onClick={onCloseClick} icon="fa-solid fa-bookmark" />
        </Link>
        <Link to={'/inbox/' + userId}>
          <SettingsItem text="Chat With Yourself" onClick={onCloseClick} icon="fa-solid fa-reply" />
        </Link>
        <Link to="/change-password">
          <SettingsItem text="Change password" onClick={onCloseClick} icon="fa-regular fa-keyboard" />
        </Link>
        <div className="text-red-500" onClick={logout}>
          <SettingsItem text="Logout" onClick={onCloseClick} icon="fa-solid fa-arrow-right-from-bracket" />
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
