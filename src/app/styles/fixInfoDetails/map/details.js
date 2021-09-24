/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {width} from '../../../assets/base';

const stylesDetails = StyleSheet.create({
  // Thong tin dia chi
  detailsContainer: {
    backgroundColor: '#fff',
    bottom: 340,
    width: width,
    height: 600,
    flexDirection: 'column',
  },
  // Text
  headerDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    height: 60,
  },
  textDetailsLocality: {
    fontSize: 22,
    fontWeight: '900',
  },
  textDetailsLocation: {
    fontSize: 14,
    color: '#939497',
  },
  // Touch
  touchDetails: {
    backgroundColor: '#fb6100',
    height: 60,
    marginLeft: 20,
    borderColor: '#fb6100',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 40,
    marginBottom: 20,
  },
  textTouchDetails: {
    color: '#fff',
    fontSize: 18,
  },
  // Text
  titleAddressDetails: {
    color: 'gray',
    fontSize: 15,
    marginLeft: 20,
  },
  textDetailsAddress: {
    fontSize: 15,
    marginLeft: 20,
    width: '95%',
  },
  //  Foot Icon
  timesIconDetails: {
    marginBottom: 70,
    marginLeft: 12,
    color: '#8b8d91',
  },
});

export default stylesDetails;
