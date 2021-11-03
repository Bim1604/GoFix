/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {width, height} from '../../assets/base';
const stylesSwiper = StyleSheet.create({
  //Header swiper
  headerWrap: {
    height: height / 4.5,
    width: width / 1.13,
    marginLeft: 21,
    bottom: height / 5.8,
  },
  LinearGradientWrap: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    marginBottom: 15,
  },
  headerImage: {
    flex: 1,
    borderRadius: 4,
  },
  // Dot
  headerDot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 20,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  headerActiveDot: {
    backgroundColor: '#fe8c00',
    width: 20,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  // Text Body
  bodyTextTitle: {
    fontSize: 20,
    color: '#fb6100',
    fontWeight: '700',
  },
});

export default stylesSwiper;
