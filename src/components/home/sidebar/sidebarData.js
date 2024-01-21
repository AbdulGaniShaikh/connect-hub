import home from '../../../assets/icons/home.svg';
import search from '../../../assets/icons/search.svg';
import message from '../../../assets/icons/send.svg';
import group from '../../../assets/icons/users.svg';
import saved from '../../../assets/icons/bookmark.svg';

const sidebarData = [
  {
    text: 'Home',
    to: '/home',
    icon: home
  },
  {
    text: 'Search',
    to: '/home',
    icon: search
  },
  {
    text: 'Messages',
    to: '/friend-list',
    icon: message
  },
  {
    text: 'Groups',
    to: '/groups',
    icon: group
  },
  {
    text: 'Saved',
    to: '/saved',
    icon: saved
  }
];

export default sidebarData;
