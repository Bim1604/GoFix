/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {height} from '../../assets/base';

const stylesHeader = StyleSheet.create({
  // linear gradient
  LinearGradient: {
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  // header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height / 3.5,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
    margin: 20,
  },
  headerIconMessage: {
    color: '#fff',
    margin: 20,
  },
  headerWelcome: {
    bottom: height / 5.0,
    marginLeft: 20,
    fontSize: 17,
    color: '#fff',
  },
});

export default stylesHeader;
