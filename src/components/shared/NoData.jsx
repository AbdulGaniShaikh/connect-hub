import noData from './../../assets/images/no-data.jpg';
const NoData = (props) => {
  const { message } = props;
  return (
    <div className="flex flex-col justify-center items-center text-lg">
      <img src={noData} alt="No data" />
      <p>{message}</p>
    </div>
  );
};

export default NoData;
