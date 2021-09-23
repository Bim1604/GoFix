/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {width, height} from '../../assets/base';

const stylesBody = StyleSheet.create({
  // body
  bodyContainer: {
    borderTopLeftRadius: 20,
    height: height,
    marginLeft: 20,
    paddingTop: 20,
  },
  // Item
  bodyItemTouchable: {
    borderWidth: 2,
    borderRadius: 10,
    width: width - 38,
    borderColor: '#fff',
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  bodyTextContainer: {
    width: '70%',
    marginTop: 15,
    marginBottom: 15,
  },
  // Item Name
  bodyTextName: {
    maxWidth: '90%',
    fontSize: 18,
    fontWeight: '800',
    color: '#696969',
  },
  // Item Text Number
  bodyTextNumber: {
    fontSize: 16,
    color: '#696969',
  },
  // Item Icon
  bodyIconContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bodyIcon: {
    color: '#fb6100',
  },
  // Button Bottom
  buttonStyle: {
    backgroundColor: '#fb6100',
    width: 60,
    height: 60,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 45,
    bottom: 2,
  },
});

export default stylesBody;
