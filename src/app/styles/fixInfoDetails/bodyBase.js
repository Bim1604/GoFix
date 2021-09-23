/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';
import {width, height} from '../../assets/base';

const stylesBodyBase = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
  },
  bodyTitle: {
    marginTop: 10,
    marginBottom: 10,
    color: '#A9A9A9',
    marginLeft: 20,
  },
  // body
  bodyContainer: {
    height: height * 1.2,
    width: width,
  },
  //  body address
  bodyFormContainer: {
    flexDirection: 'row',
    width: width,
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 1,
    borderColor: '#A9A9A9',
    borderStyle: 'dotted',
  },
  // body Address Icon header
  bodyAddressIconContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyAddressIcon: {
    color: '#fb6100',
  },
  bodyAddressTextContainer: {
    width: '75%',
  },
  bodyAddressText: {
    fontSize: 16,
  },
  bodyAddress: {
    flexDirection: 'row',
  },
  // body Address Icon Footer
  bodyIconContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyIcon: {
    color: '#696969',
  },
});

export default stylesBodyBase;
