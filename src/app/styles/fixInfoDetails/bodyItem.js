/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';
import {width} from '../../assets/base';

const stylesBodyItem = StyleSheet.create({
  //  Motor
  bodyMotorNameContainer: {
    width: '100%',
    marginBottom: 5,
  },
  bodyMotorNameText: {
    width: '85%',
    marginLeft: 5,
    fontSize: 17,
  },
  bodyMotorDetailContainer: {
    flexDirection: 'row',
  },
  bodyMotorNumberText: {
    fontSize: 14,
    color: '#696969',
    width: '75%',
  },
  bodyMotorColorText: {
    fontSize: 17,
    width: '25%',
  },
  // Body Check Box
  bodyCheckBoxContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  bodyCheckBoxItemContainer: {
    flexDirection: 'row',
  },
  bodyCheckBoxLeftContainer: {
    marginRight: width / 6,
  },
  bodyCheckBoxMiniContainer: {
    flexDirection: 'row',
  },
  bodyCheckBox: {
    marginBottom: 10,
    marginRight: 5,
  },
  bodyCheckBoxIcon: {
    borderColor: 'red',
    bottom: 1.5,
  },
  bodyCheckBoxContent: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#f7f7f7',
    minHeight: 70,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  // Body Image description
  bodyImageDesContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    width: '100%',
    alignItems: 'center',
  },
  bodyImageDesIconContainer: {
    borderColor: '#A9A9A9',
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyImageDesIcon: {
    color: '#A9A9A9',
  },
  bodyImageDesText: {
    marginLeft: 30,
    fontSize: 15,
    color: '#696969',
  },
});

export default stylesBodyItem;
