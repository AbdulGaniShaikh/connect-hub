import { useEffect, useRef, useState } from 'react';
import closeIcon from 'assets/icons/close.svg';
import profileDefault from 'assets/icons/user.svg';
import NoData from 'components/shared/NoData';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import { imageUrl } from 'global';
import { friendService } from 'service';
import useSocket from 'hooks/useSocket';
import useErrorBehavior from 'hooks/useErrorBehavior';
import Spinner from 'components/shared/Spinner';

const ShareList = (props) => {
  const { onCloseClick } = props;
  const { postId, userId } = props;

  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [page, setPage] = useState(0);

  const [publishMessage] = useSocket(userId);
  const defaultErrorBehavior = useErrorBehavior();

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const fetchShareList = async () => {
    try {
      setFetchLoading(true);
      setLoading(true);
      const res = await friendService.getFriends(userId, page);
      if (res.data.content.length > 0) {
        setFriends([...res.data.content, ...friends]);
        setPage(page + 1);
      }
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setFetchLoading(false);
      setLoading(false);
    }
  };

  const onSendClick = () => {
    checked.forEach((recieverId, i) => {
      publishMessage(recieverId, postId, true);
    });
    onCloseClick();
  };

  useEffect(() => {
    if (!userId) return;
    fetchShareList();
  }, [userId]);

  useEffect(() => {
    setPage(0);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl py-5 pl-5 overflow-hidden">
      <div className="grid gap-y-3 h-fit pr-5">
        <div className="flex justify-between items-start">
          <h1 className="font-medium">Share</h1>
          <img src={closeIcon} alt="close" className="size-5 cursor-pointer" onClick={onCloseClick} />
        </div>
        <hr />
      </div>
      <div className="flex flex-col h-full overflow-y-scroll">
        {!loading && friends.length === 0 && <NoData message="You don't have any friends." />}
        {!loading &&
          friends.map((user, id) => (
            <UsersWithRadioButton
              key={id}
              {...user}
              onClick={handleCheck}
              checked={checked.find((value) => value === user.userId)}
            />
          ))}
        {loading &&
          Array(5)
            .fill(0)
            .map((_, id) => <UserCardSkeleton key={id} />)}
        {friends.length !== 0 && (
          <div
            onClick={() => {
              fetchShareList();
            }}
            className="flex flex-row justify-center items-center text-center cursor-pointer select-none mt-5"
          >
            {fetchLoading && <Spinner color="text-blue-400" />}
            Load more
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

const UsersWithRadioButton = ({
  username = '',
  email = '',
  userId = '',
  profileImageId = '',
  onClick = () => {},
  checked = false
}) => {
  // const { username, email, userId, profileImageId, onClick, checked } = props;
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
      className="flex justify-start h-fit items-center w-full px-5 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-100"
    >
      <img
        src={profileImageId ? `${imageUrl}/${profileImageId}` : profileDefault}
        alt="profile"
        className="w-circleImage h-circleImage rounded-full aspect-square object-cover bg-primaryColor"
      />
      <div className="text-gray-900 focus:outline-none w-full text-sm p-2.5">
        <p className="font-medium overflow-ellipsis overflow-hidden w-40">{username}</p>
        <p className="font-thin text-xs overflow-ellipsis overflow-hidden w-40">{email}</p>
      </div>
      <input
        ref={checkBoxRef}
        value={userId}
        onChange={handleCheck}
        checked={checked}
        className="size-5"
        type="checkbox"
        name="userlist"
      />
    </div>
  );
};

export default ShareList;
