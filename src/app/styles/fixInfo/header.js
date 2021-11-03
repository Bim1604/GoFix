/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {height} from '../../assets/base';

const stylesHeader = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fa',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height / 9,
  },
  headerIconBack: {
    color: '#fff',
    margin: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  headerIconMessage: {
    color: '#fff',
    margin: 20,
  },
});

export default stylesHeader;
