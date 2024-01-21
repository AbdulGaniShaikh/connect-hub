const Comment = (props) => {
  const { name, body } = props;
  return (
    <div className="flex justify-start items-start w-fit my-2 pr-5">
      <img
        src="logo512.png"
        alt=""
        className="w-circleImage h-circleImage rounded-full bg-gray-100 object-cover cursor-pointer "
      />
      <div className="text-gray-900 focus:outline-none w-full text-sm mx-2 ">
        <p className="font-medium cursor-pointer inline">{name}</p>
        <p className="">{body}</p>
      </div>
    </div>
  );
};

export default Comment;
