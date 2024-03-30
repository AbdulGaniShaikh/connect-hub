const SettingsItem = ({ text, onClick, icon = '' }) => {
  return (
    <div
      onClick={onClick}
      className="my-1 p-3 rounded-md hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer select-none"
    >
      <h1>
        <i className={icon}></i>&nbsp; {text}
      </h1>
    </div>
  );
};

export default SettingsItem;
