/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';

const stylesBodySearch = StyleSheet.create({
  textTitle: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  suggestContainer: {
    // flexDirection: 'row',
    flexDirection: 'row',
    paddingBottom: 20,
    marginTop: 20,
  },
  suggestIconContainer: {
    width: '15%',
    justifyContent:'center',
    alignItems: 'center',
    marginRight: 10,
  },
  suggestIconCircle: {
    width: 50,
    height: 50,
    borderColor: '#e1e2e7',
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e2e7',
  },
  suggestIcon: {
    color: '#524f4f',
  },
  suggestTextContainer: {
    flexDirection: 'column',
    width: '65%',
  },
  suggestTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  suggestText: {
    fontSize: 16,
  },
});

export default stylesBodySearch;
