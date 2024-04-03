import notFoundImage from 'assets/images/404.svg';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen w-full select-none gap-5">
      <p className="text-4xl">OOPS! PAGE NOT FOUND</p>
      <img src={notFoundImage} alt="Not found" className="w-3/4 md:w-120" />
      <p className="text-xl w-full md:w-120">
        Sorry, the page you are looking for doesn't exists. The link you followed is probably broken or page has been
        removed.
      </p>
    </div>
  );
};

export default NotFound;
