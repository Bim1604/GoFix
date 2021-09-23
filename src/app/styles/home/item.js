/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {height, width} from '../../assets/base';

const stylesVehicle = StyleSheet.create({
  // vehicle
  vehicleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemContainer: {
    alignItems: 'center',
  },
  itemVehicleTouchable: {
    width: width - 40,
    height: height / 9.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  bodyItemVehicleText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
    fontWeight: '700',
  },
  // linear
  LinearGradientWrap: {
    borderRadius: 20,
    marginTop: 10,
  },
  LinearServiceGradientWrap: {
    marginTop: 15,
    borderRadius: 20,
  },
});

export default stylesVehicle;
