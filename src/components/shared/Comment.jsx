import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

const Comment = (props) => {
  const { userId, username, profileImageId, comment, date } = props;
  var datePosted = null;
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  try {
    datePosted = new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  } catch (err) {
    datePosted = 'now';
  }
  return (
    <div className="flex justify-start items-start w-fit my-2 pr-5">
      <Link to={`/users/${userId}`}>
        <ProfileImage id={profileImageId} />
      </Link>
      <div className="focus:outline-none flex-1 text-sm mx-2 ">
        <Link to={`/users/${userId}`} className="inline">
          <span className="font-medium cursor-pointer">{username} </span>
          <span className="text-xs">at {datePosted}</span>
        </Link>
        <p className="">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
