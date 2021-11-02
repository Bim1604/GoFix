/* eslint-disable prettier/prettier */
import {faCar, faMotorcycle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {stylesBody} from '../../styles/fixInfo';

// const data = [
//   {
//     cate: 'Xe máy',
//     name: 'Subaru Impreza WRX STI RA Spec-C',
//     number: '73B.263162',
//     color: 'Hồng',
//   },
//   {
//     cate: 'Ô tô',
//     name: 'Toyota Vios',
//     number: '73B.283342',
//     color: 'Hồng',
//   },
// ];
const apiVehicle = 'https://history-search-map.herokuapp.com/api/vehicle';

const BodyComponent = ({navigation, route}) => {
  const [data, setData] = useState([
    {
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
          if (route.params.route.params.phone === json[index].phone) {
            vehicleItem.push(json[index]);
          }
        }
        setData(vehicleItem);
      });
  }, [route.params.route.params.phone]);
  const ItemVehicle = ({cate, name, number, color}) => {
    return (
      <TouchableOpacity
        style={stylesBody.default.bodyItemTouchable}
        onPress={() => {
          navigation.navigate('FixInfoDetailsComponent', {
            name: name,
            cate: cate,
            number: number,
            color: color,
            phone: route.params.route.params.phone,
          });
        }}>
        <View style={stylesBody.default.bodyIconContainer}>
          <FontAwesomeIcon
            style={stylesBody.default.bodyIcon}
            icon={cate === 'Xe máy' ? faMotorcycle : faCar}
            size={48}
          />
        </View>
        <View style={stylesBody.default.bodyTextContainer}>
          <View>
            <Text style={stylesBody.default.bodyTextName}>{name}</Text>
            <Text style={stylesBody.default.bodyTextNumber}>{number}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={stylesBody.default.bodyContainer}>
      {/* Item */}
      {data.map((item, index) => (
        <ItemVehicle
          cate={item.cate}
          name={item.name}
          number={item.number}
          color={item.color}
          key={index}
        />
      ))}
    </View>
  );
};

export default BodyComponent;
