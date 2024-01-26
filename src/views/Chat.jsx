import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import profile from './../assets/profile.jpg';
import axios from 'axios';

const Chat = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const textAreaRef = useRef(null);
  const [val, setVal] = useState('');
  var messageEnd = useRef(null);

  const onChange = (e) => {
    setVal(e.target.value);
  };

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, [val]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
      setUser(res.data);
    });
    messageEnd.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="flex w-full mx-5 mb-5 flex-col h-chat bg-white rounded-3xl py-2 pl-5 overflow-hidden">
      <div className="grid gap-y-3 h-fit pr-5">
        <a href={`/users/${id}`} className="flex overflow-hidden items-center justify-center mr-5">
          <img
            src={profile ? profile : 'logo512.png'}
            alt={id}
            className="rounded-full h-circleImage w-circleImage object-cover"
          />
          <div className=" text-gray-900 text-sm px-2.5 overflow-hidden">
            <p className="font-medium overflow-ellipsis overflow-hidden ">{user ? user.username : 'username'}</p>
            <p className="text-xs overflow-ellipsis overflow-hidden">{user ? user.email : 'email'}</p>
          </div>
        </a>
        <hr />
      </div>
      <div className="grid grow overflow-y-scroll pt-2 pr-5">
        <div>
          <Message chatAlignLeft={true} />
          <Message chatAlignLeft={true} />
          <Message chatAlignLeft={true} />
          <Message chatAlignLeft={false} />
          <Message chatAlignLeft={false} />
          <DateBreaker date="12 Jan, 2023" />
          <Message chatAlignLeft={false} />
          <Message chatAlignLeft={true} />
          <Message chatAlignLeft={false} />
          <DateBreaker date="13 Jan, 2023" />
          <Message chatAlignLeft={true} />
          <div ref={(el) => (messageEnd = el)} id="chat-bottom"></div>
        </div>
      </div>

      <div className="flex justify-center items-start flex-row mr-5 gap-x-1">
        <textarea
          alt="post-data"
          type="text"
          name="post-data"
          id="post-data"
          value={val}
          onChange={onChange}
          placeholder="type your message here"
          className="bg-gray-100 text-gray-900 focus:outline-none w-full text-sm p-2.5 resize-none"
          ref={textAreaRef}
        ></textarea>
        {val.trim().length > 0 && (
          <p onClick={() => alert(val)} className="text-primaryColor font-bold cursor-pointer p-2.5">
            Send
          </p>
        )}
      </div>
    </div>
  );
};

const DateBreaker = (props) => {
  const { date } = props;
  return (
    <div className="grid grid-cols-3 items-center ">
      <hr className="grow h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
      <p className="grow-0 justify-self-center text-xs">{date}</p>
      <hr className="grow h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
    </div>
  );
};

const Message = (props) => {
  const { chatAlignLeft } = props;
  var bgColor = chatAlignLeft ? 'bg-gray-100' : 'bg-chatRecieverColor';
  var textColor = chatAlignLeft ? '' : 'text-white';
  return (
    <div className={`mb-2 flex items-center justify-${chatAlignLeft ? 'start' : 'end'}`}>
      {!chatAlignLeft && <span className="text-xs px-2">12:12PM</span>}
      <span className={`px-5 py-1 rounded-2xl max-w-64 ${bgColor} ${textColor}`}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit dolor ratione soluta aperiam aut debitis quisquam.
        Alias ducimus suscipit similique odit modi iste sunt, quod magnam blanditiis numquam, maxime unde!
      </span>
      {chatAlignLeft && <span className="text-xs px-2">12:12 PM</span>}
    </div>
  );
};

export default Chat;
