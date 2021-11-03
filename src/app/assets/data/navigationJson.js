/* eslint-disable prettier/prettier */
import HomeScreen from '../../container/HomeScreen';
import {
  faBell,
  faHistory,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {Dimensions} from 'react-native';
import Logo from '../image/Logo.png';
import ProfileScreen from '../../container/ProfileScreen';
import HistoryScreen from '../../container/HistoryScreen';

export function getWidth() {
  let width = Dimensions.get('window').width;
  width = width - 70;
  return width / 5;
}

const data = [
  {
    name: 'Trang chủ',
    component: HomeScreen,
    fontSize: 12,
    icon: faHome,
    marginTop: 8,
  },
  {
    name: 'Lich sử',
    component: HistoryScreen,
    fontSize: 12,
    icon: faHistory,
    marginTop: 8,
  },
  {
    name: 'GoFix',
    component: HistoryScreen,
    fontSize: 14,
    image: Logo,
    marginTop: 8,
  },
  {
    name: 'Thông Báo',
    component: HomeScreen,
    fontSize: 12,
    icon: faBell,
    marginTop: 8,
    toValue: getWidth() * 3.6,
  },
  {
    name: 'Cá Nhân',
    component: ProfileScreen,
    fontSize: 12,
    icon: faUser,
    marginTop: 8,
  },
];

export default data;
