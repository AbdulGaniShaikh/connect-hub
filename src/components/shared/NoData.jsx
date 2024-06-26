import noData from 'assets/images/no-data.svg';
const NoData = (props) => {
  const { message } = props;
  return (
    <div className="flex flex-col justify-center items-center text-lg text-center select-none">
      <img src={noData} alt="No data" className="size-64" />
      <p>{message}</p>
    </div>
  );
};

export default NoData;
