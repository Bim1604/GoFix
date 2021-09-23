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
    toValue: 0,
  },
  {
    name: 'Lich sử',
    component: HomeScreen,
    fontSize: 12,
    icon: faHistory,
    marginTop: 8,
    toValue: getWidth() * 1.2,
  },
  {
    name: 'GoFix',
    component: HomeScreen,
    fontSize: 14,
    icon: faHistory,
    image: Logo,
    marginTop: 8,
    toValue: 0,
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
    component: HomeScreen,
    fontSize: 12,
    icon: faUser,
    marginTop: 8,
    toValue: getWidth() * 4.8,
  },
];

export default data;
