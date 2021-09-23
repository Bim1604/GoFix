/* eslint-disable prettier/prettier */
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {width} from '../../assets/base';
import Geocoder from 'react-native-geocoder';

const SearchMapComponent = ({navigation, route}) => {
  const [searchValue, setSearchValue] = useState('');
  const [address, setAddress] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [locality, setLocality] = useState();

  const updateAddress = () => {
    Geocoder.geocodeAddress(searchValue).then(res => {
      if (res.length > 0) {
        setLatitude(res[0].position.lat);
        setLongitude(res[0].position.lng);
        Geocoder.geocodePosition({
          lat: res[0].position.lat,
          lng: res[0].position.lng,
        }).then(pos => {
          setLocality(
            pos[0].subAdminArea === null
              ? pos[0].feature === null
                ? pos[0].locality
                : pos[0].feature
              : pos[0].subAdminArea,
          );
          setAddress(pos[0].formattedAddress);
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          // disabled={true}
          onPress={() => {
            if (latitude === undefined && searchValue === '') {
              navigation.navigate('CurrentLocationComponent', {
                latitude: route.params.lat,
                longitude: route.params.lng,
                city: route.params.locality,
                addr: route.params.address,
              });
            } else {
              navigation.navigate('CurrentLocationComponent', {
                addr: address,
                latitude: latitude,
                longitude: longitude,
                city: locality,
              });
            }
          }}>
          <FontAwesomeIcon icon={faChevronLeft} size={22} />
        </TouchableOpacity>
        <View style={styles.headerTextInput}>
          <TextInput
            style={styles.headerText}
            placeholder="Tìm kiếm"
            onChangeText={text => {
              setSearchValue(text);
            }}
            onBlur={() => {
              searchValue !== '' ? updateAddress() : console.log('cancel search');
            }}
            keyboardType="email-address"
          />
        </View>
      </View>
      <Text style={styles.textTitle}>Gần đây</Text>
      {/* Flat Lish history */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  headerContainer: {
    borderColor: '#dfdcdc',
    flexDirection: 'row',
    width: width - 30,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerTextInput: {
    marginLeft: 10,
  },
  headerText: {
    fontSize: 18,
  },
  // body
  textTitle: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default SearchMapComponent;

