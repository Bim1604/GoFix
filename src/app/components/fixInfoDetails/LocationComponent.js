/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {height, width} from '../../assets/base';
import Geocoder from 'react-native-geocoder';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faTimes} from '@fortawesome/free-solid-svg-icons';

const center =
  (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122;
const location = {
  latitude: 10,
  longitude: 10,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};
let isMoveTab = false;
const LocationComponent = ({navigation, route}) => {
  const [latitude, setLatitude] = useState(route.params.lat);
  const [longitude, setLongitude] = useState(route.params.lng);
  const [locality, setLocality] = useState(route.params.locality);
  const [address, setAddress] = useState(route.params.address);
  const [isTap, setIsTap] = useState(false);

  if (isMoveTab === true) {
    isMoveTab = false;
    setPosition();
  }
  // after search
  function setPosition() {
    setLatitude(route.params.latitude);
    setLongitude(route.params.longitude);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={location}
        onPress={event => {
          Geocoder.geocodePosition({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
          }).then(res => {
            setIsTap(false);
            setLocality(
              res[0].subAdminArea === null
                ? res[0].feature === null
                  ? res[0].locality
                  : res[0].feature
                : res[0].subAdminArea,
            );
            setAddress(res[0].formattedAddress);
          });
          setLatitude(event.nativeEvent.coordinate.latitude);
          setLongitude(event.nativeEvent.coordinate.longitude);
        }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: center,
        }}>
        {/* <Marker
          coordinate={{
            latitude: latitude === undefined ? route.params.lat : latitude,
            longitude: longitude,
          }}
          title={'Your Location'}
          description={'Bạn đang ở đây'}
          draggable
        /> */}
      </MapView>
      {/* header */}
      <View style={styles.headerMap}>
        <View style={styles.headerTextInputContainer}>
          <View>
            <TouchableOpacity
              style={styles.headerTouchContainer}
              onPress={() => {
                isMoveTab = true;
                navigation.navigate('FixInfoDetailsComponent', {
                  address: address,
                  lat: latitude,
                  lng: longitude,
                });
              }}>
              <FontAwesomeIcon
                style={styles.headerIconBack}
                icon={faChevronLeft}
                size={22}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.headerTextInput}
              onPressIn={() => {
                isMoveTab = true;
                navigation.navigate('SearchMapComponent', {
                  lat: latitude,
                  lng: longitude,
                  locality: locality,
                  address: address,
                });
              }}
              placeholder="Tìm kiếm vị trí"
            />
          </View>
        </View>
      </View>
      {isTap === false ? (
        <View style={styles.detailsContainer}>
          <View style={styles.headerDetailsContainer}>
            <Text style={styles.textDetailsLocality}>
              {route.params.city === undefined
                ? locality === ''
                  ? route.params.locality
                  : locality
                : route.params.city}
            </Text>
            <TouchableOpacity onPress={() => setIsTap(true)}>
              <FontAwesomeIcon
                icon={faTimes}
                size={20}
                style={styles.timesIconDetails}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.touchDetails}
            onPress={() => {
              navigation.navigate('FixInfoDetailsComponent', {
                address: address,
              });
            }}>
            <Text style={styles.textTouchDetails}>Xác nhận địa chỉ</Text>
          </TouchableOpacity>
          <Text style={styles.titleAddressDetails}>Địa Chỉ</Text>
          <Text style={styles.textDetailsAddress}>
            {route.params.addr === undefined
              ? address === ''
                ? route.params.address
                : address
              : route.params.addr}
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  // header
  headerMap: {
    flexDirection: 'row',
    bottom: 815,
    marginLeft: 11,
  },
  headerTextInputContainer: {
    borderWidth: 1,
    borderRadius: 15,
    width: '97%',
    height: 50,
    borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 23,
    marginRight: 23,
  },
  headerTouchContainer: {
    height: '100%',
    justifyContent: 'center',
    width: 25,
    marginLeft: 10,
  },
  headerIconBack: {
    color: '#778899',
  },
  TextInputContainer: {
    width: '88%',
  },
  headerTextInput: {
    width: '100%',
    fontSize: 18,
    color: '#000000',
    marginLeft: 10,
  },
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

export default LocationComponent;
