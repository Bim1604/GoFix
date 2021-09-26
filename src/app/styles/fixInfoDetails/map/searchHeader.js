/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';
import {width, height} from '../../../assets/base';

const stylesHeaderSearch = StyleSheet.create({
    // header
  container: {
    paddingLeft: 15,
    paddingTop: 30,
    backgroundColor: '#fff',
    height: height,
  },
  headerContainer: {
    borderColor: '#dfdcdc',
    flexDirection: 'row',
    width: width - 30,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerTextInput: {
    marginLeft: 10,
  },
  headerText: {
    fontSize: 18,
  },
});

export default stylesHeaderSearch;
