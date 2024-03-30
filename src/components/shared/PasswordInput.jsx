import { useRef, useState } from 'react';

const PasswordInput = ({ id = '', label = '', hint = '', val = '', onChange = () => {}, error = '' }) => {
  const [show, setShow] = useState(false);
  const input = useRef(null);

  return (
    <div>
      <label htmlFor={id} className={`block mb-2 text-sm font-medium ${error.length > 0 ? 'text-red-700' : ' '}`}>
        {label}
      </label>
      <div
        htmlFor={id}
        className="flex flex-row items-center border border-lightHover dark:border-darkHover  text-sm rounded-lg focus:ring-4 ring-lightHover dark:ring-darkHover w-full hover:ring-4 ease-linear duration-200 overflow-hidden"
      >
        <input
          type="password"
          id={id}
          placeholder={hint}
          value={val}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          ref={input}
          className="focus:border-transparent focus:outline-none bg-lightBg dark:bg-darkBg h-full w-full p-4"
          autoComplete="off"
        />

        <i
          className="fa-regular fa-eye-slash fa-lg mr-2 cursor-pointer"
          onClick={(e) => {
            if (show) {
              e.currentTarget.classList.remove('fa-eye');
              e.currentTarget.classList.add('fa-eye-slash');
              input.current.type = 'password';
            } else {
              e.currentTarget.classList.add('fa-eye');
              e.currentTarget.classList.remove('fa-eye-slash');

              input.current.type = 'text';
            }
            setShow(!show);
          }}
        ></i>
      </div>
      <p className="mt-1 text-xs text-red-700 select-none">{error.length > 0 ? error : ''}&nbsp;</p>
    </div>
  );
};

export default PasswordInput;
