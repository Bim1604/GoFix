/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {height} from '../../assets/base';
const stylesGeneral = StyleSheet.create({
  // container
  container: {
    flex: 1,
    backgroundColor: '#f4f6fa',
  },
  //   body
  bodyContainer: {
    margin: 20,
    justifyContent: 'space-between',
    bottom: height / 6,
  },
});

export default stylesGeneral;
