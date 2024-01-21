import { Link } from 'react-router-dom';

const SidebarMenuItem = (props) => {
  const { text, icon, to } = props;
  return (
    <Link to={to}>
      <div className="flex items-center p-2.5 rounded-tl-lg rounded-bl-lg hover:bg-gray-100">
        <img src={icon} alt="" className="size-5 mr-3" />
        {text}
      </div>
    </Link>
  );
};

export default SidebarMenuItem;
