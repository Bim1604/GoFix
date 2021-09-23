/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';
import {width} from '../../assets/base';

const stylesBottom = StyleSheet.create({
  // bottom
  bottomView: {
    backgroundColor: '#fff',
    width: width,
    height: 110,
    alignItems: 'center',
    position: 'absolute',
    bottom: 6,
    borderColor: '#A9A9A9',
    paddingTop: 10,
  },
  bottomText: {
    fontSize: 16,
    marginBottom: 10,
    marginRight: width / 2,
    color: '#7b7c7f',
    fontWeight: '700',
  },
  bottomTouchableNotReady: {
    width: width - 20,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cccccc',
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomTouchableReady: {
    width: width - 20,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cccccc',
    backgroundColor: '#fb6100',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomTextTouchable: {
    color: '#fff',
    fontWeight: '700',
  },
  bottomIcon: {
    color: '#fff',
    left: 100,
  },
});

export default stylesBottom;
