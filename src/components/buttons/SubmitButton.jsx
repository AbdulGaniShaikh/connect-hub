import { useEffect, useRef, useState } from 'react';
import Button from './Button';

const SubmitButton = ({ text, onClick }) => {
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        buttonRef.current.click();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div ref={buttonRef} className="w-full">
      <Button
        onClick={(e) => {
          e.preventDefault();
          onClick(setLoading);
        }}
        loading={loading}
        text={text}
      />

      {/* type="button"
        className="flex justify-center   bg-primaryColor hover:bg-primaryColorDark focus:ring-4  ring-red-100 focus:outline-none hover:ring-4 ease-linear duration-200 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center"
        onClick={(e) => {
          e.preventDefault();
          onClick(setLoading);
        }}
      >
        {loading && <Spinner />}
        {text} */}
    </div>
  );
};

export default SubmitButton;
