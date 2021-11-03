/* eslint-disable prettier/prettier */
import {
  faCar,
  faChevronLeft,
  faMotorcycle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {height, width} from '../../assets/base';

const apiVehicle = 'https://history-search-map.herokuapp.com/api/vehicle';

const VehicleDetailsComponent = ({navigation, route}) => {
  const [data, setData] = useState([
    {
      id: '',
      cate: '',
      name: '',
      number: '',
      color: '',
    },
  ]);

  useEffect(() => {
    fetch(apiVehicle)
      .then(res => res.json())
      .then(json => {
        let vehicleItem = [];
        for (let index = 0; index < json.length; index++) {
          if (route.params.id === json[index].userID) {
            vehicleItem.push(json[index]);
          }
        }
        setData(vehicleItem);
      });
  }, [route.params]);
  const ItemVehicle = ({cate, name, number, color, id}) => {
    return (
      <TouchableOpacity
        style={styles.bodyItemTouchable}
        onPress={() => {
          navigation.navigate('VehicleUpdateComponent', {
            name: name,
            cate: cate,
            number: number,
            color: color,
            userID: route.params.id,
            id: id,
          });
        }}>
        <View style={styles.bodyIconContainer}>
          <FontAwesomeIcon
            style={styles.bodyIcon}
            icon={cate === 'Xe máy' ? faMotorcycle : faCar}
            size={48}
          />
        </View>
        <View style={styles.bodyTextContainer}>
          <View>
            <Text style={styles.bodyTextName}>{name}</Text>
            <Text style={styles.bodyTextNumber}>{number}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {/* Header */}
      <LinearGradient
        colors={['#fe8c00', '#f83600']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.headerLinearContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <FontAwesomeIcon icon={faChevronLeft} size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Thông tin xe</Text>
        </View>
      </LinearGradient>
      {/* Body */}
      <View style={styles.bodyContainer}>
        {/* Item */}
        {data.map((item, index) => (
          <ItemVehicle
            cate={item.cate}
            name={item.name}
            number={item.number}
            color={item.color}
            key={index}
            id={item.id}
          />
        ))}
      </View>
      {/* Footer */}
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate('VehicleAddComponent', {
            id: route.params.id,
          });
        }}>
        <Text style={styles.buttonTextStyle}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Header
  headerLinearContainer: {
    height: height / 13,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  headerText: {
    fontSize: 23,
    fontWeight: '700',
    bottom: 3,
    color: '#fff',
    marginLeft: width / 3.5,
  },
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
    marginBottom: height / 40,
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
    bottom: height / 8,
    right: width / 20,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 45,
    bottom: 2,
  },
});

export default VehicleDetailsComponent;
