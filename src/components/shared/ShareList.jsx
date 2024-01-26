import { useRef, useState } from 'react';
import closeIcon from './../../assets/icons/close.svg';
import NoData from './NoData';

const ShareList = (props) => {
  const { onCloseClick } = props;
  const { friends } = props;
  const [checked, setChecked] = useState([]);

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const onSendClick = () => {
    let message = '';
    checked.forEach((id) => {
      message += id + ' ';
    });
    alert(message);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl py-5 pl-5 overflow-hidden">
      <div className="grid gap-y-3 h-fit pr-5">
        <div className="flex justify-between items-start">
          <h1 className="font-medium">Share</h1>
          <img src={closeIcon} alt="close" className="size-5 cursor-pointer" onClick={onCloseClick} />
        </div>
        <hr />
      </div>
      <div className="grid grow overflow-y-scroll ">
        {friends.length <= 0 ? (
          <NoData message="You don't have any friends." />
        ) : (
          <div>
            {friends.map((data) => (
              <UsersWithRadioButton {...data} onClick={handleCheck} />
            ))}
          </div>
        )}
      </div>
      {checked.length > 0 && (
        <div className="mr-5 pt-5">
          <button
            type="submit"
            className="text-white bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center "
            onClick={onSendClick}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

const UsersWithRadioButton = (props) => {
  const { username, email, userId, profile, onClick } = props;
  const checkBoxRef = useRef(null);

  const onUserClick = () => {
    checkBoxRef.current.click();
  };

  const handleCheck = (event) => {
    onClick(event);
  };

  return (
    <div
      onClick={onUserClick}
      className="flex justify-start items-center w-full px-5 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-100"
    >
      <img
        src={profile}
        alt="profile"
        className="w-circleImage h-circleImage rounded-full object-cover bg-primaryColor"
      />
      <div className="text-gray-900 focus:outline-none w-full text-sm p-2.5">
        <p className="font-medium overflow-ellipsis overflow-hidden w-40">{username}</p>
        <p className="font-thin text-xs overflow-ellipsis overflow-hidden w-40">{email}</p>
      </div>
      <input
        ref={checkBoxRef}
        value={userId}
        onChange={handleCheck}
        className="size-5"
        type="checkbox"
        name="userlist"
      />
    </div>
  );
};

export default ShareList;
