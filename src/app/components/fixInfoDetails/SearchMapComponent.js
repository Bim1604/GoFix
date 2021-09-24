/* eslint-disable prettier/prettier */
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {width} from '../../assets/base';
const APIKEY = '8-5SOefOHojoGybtR_RWzvEpYhcAdbdX-HLTX2cqcVg';
const SearchMapComponent = ({navigation, route}) => {
  const [searchValue, setSearchValue] = useState('');
  const [address, setAddress] = useState(route.params.address);
  const [latitude, setLatitude] = useState(route.params.lat);
  const [longitude, setLongitude] = useState(route.params.lng);
  const [city, setCity] = useState(route.params.city);
  const numberOfRs = 10;
  // useEffect
  useEffect(() => {
    fetch(
      `https://geocoder.ls.hereapi.com/search/6.2/geocode.json?languages=en-US&maxresults=${numberOfRs}&searchtext=${searchValue}&apiKey=${APIKEY}`,
    )
      .then(res => res.json())
      .then(json => {
        if (json.Response !== undefined) {
          setLatitude(
            json.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
          );
          setLongitude(
            json.Response.View[0].Result[0].Location.DisplayPosition.Longitude,
          );
          setCity(json.Response.View[0].Result[0].Location.Address.City);
          setAddress(json.Response.View[0].Result[0].Location.Address.Label);
        }
      });
    return () => {};
  }, [searchValue]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          // disabled={true}
          onPress={() => {
            if (latitude === undefined && searchValue === '') {
              navigation.navigate('CurrentLocationComponent', {
                lat: latitude,
                lng: longitude,
                city: city,
                address: address,
              });
            } else {
              navigation.navigate('CurrentLocationComponent', {
                address: address,
                lat: latitude,
                lng: longitude,
                city: city,
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
            // onBlur={() => {
            //   searchValue !== '' ? updateAddress() : console.log('cancel search');
            // }}
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
