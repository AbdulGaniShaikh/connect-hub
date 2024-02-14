import { imageUrl } from 'global';
import profilePlaceholder from 'assets/icons/user.svg';
import { Link } from 'react-router-dom';

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
    <Link to={`/users/${userId}`} className="flex justify-start items-start w-fit my-2 pr-5">
      <img
        src={profileImageId ? `${imageUrl}/${profileImageId}` : profilePlaceholder}
        alt=""
        className="w-circleImage h-circleImage rounded-full bg-gray-100 aspect-square object-cover cursor-pointer "
      />
      <div className="text-gray-900 focus:outline-none w-full text-sm mx-2 ">
        <p className="inline">
          <span className="font-medium cursor-pointer">{username} </span>
          <span className="text-xs">at {datePosted}</span>
        </p>
        <p className="">{comment}</p>
      </div>
    </Link>
  );
};

export default Comment;
