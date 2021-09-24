/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faTimes} from '@fortawesome/free-solid-svg-icons';
import {stylesMap, stylesDetails} from '../../styles/fixInfoDetails/map/index';
import {APPID, APPCODE} from '@env';

const appID = APPID;
const appCode = APPCODE;
const center =
  (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122;
const location = {
  latitude: 10,
  longitude: 10,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};

const LocationComponent = ({navigation, route}) => {
  const [latitude, setLatitude] = useState(route.params.lat !== undefined ? route.params.lat : 10);
  const [longitude, setLongitude] = useState(route.params.lng !== undefined ? route.params.lng : 10);
  const [city, setCity] = useState(route.params.city !== undefined ? route.params.city : '');
  const [address, setAddress] = useState(route.params.address);
  const [isTap, setIsTap] = useState(false);

  console.log(route);

  // after search
  // function setPosition() {
  //   setLatitude(route.params.latitude);
  //   setLongitude(route.params.longitude);
  // }

  return (
    <View style={stylesMap.default.container}>
      <MapView
        style={stylesMap.default.map}
        initialRegion={location}
        onPress={event => {
          fetch(
            `https://places.sit.ls.hereapi.com/places/v1/discover/search?app_id=${appID}&app_code=${appCode}&at=${event.nativeEvent.coordinate.latitude},${event.nativeEvent.coordinate.longitude}&q=street`,
          )
            .then(res => res.json())
            .then(local => {
              setCity(local.search.context.location.address.city);
              setAddress(
                local.search.context.location.address.city +
                  ', ' +
                  local.search.context.location.address.county +
                  ', ' +
                  local.search.context.location.address.country,
              );
            });
          setLatitude(event.nativeEvent.coordinate.latitude);
          setLongitude(event.nativeEvent.coordinate.longitude);
        }}
        region={{
          latitude: latitude,
          longitude:longitude,
          latitudeDelta: 0.015,
          longitudeDelta: center,
        }}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={'Your Location'}
          description={'Bạn đang ở đây'}
          draggable
        />
      </MapView>
      {/* header */}
      <View style={stylesMap.default.headerMap}>
        <View style={stylesMap.default.headerTextInputContainer}>
          <View>
            <TouchableOpacity
              style={stylesMap.default.headerTouchContainer}
              onPress={() => {
                navigation.navigate('FixInfoDetailsComponent', {
                  address: address,
                  lat: latitude,
                  lng: longitude,
                  city: city,
                });
              }}>
              <FontAwesomeIcon
                style={stylesMap.default.headerIconBack}
                icon={faChevronLeft}
                size={22}
              />
            </TouchableOpacity>
          </View>
          <View style={stylesMap.default.TextInputContainer}>
            <TextInput
              style={stylesMap.default.headerTextInput}
              onPressIn={() => {
                navigation.navigate('SearchMapComponent', {
                  address: address,
                  lat: latitude,
                  lng: longitude,
                  city: city,
                });
              }}
              placeholder="Tìm kiếm vị trí"
            />
          </View>
        </View>
      </View>
      {isTap === false ? (
        <View style={stylesDetails.default.detailsContainer}>
          <View style={stylesDetails.default.headerDetailsContainer}>
            <Text style={stylesDetails.default.textDetailsLocality}>
              {city}
            </Text>
            <TouchableOpacity onPress={() => setIsTap(true)}>
              <FontAwesomeIcon
                icon={faTimes}
                size={20}
                style={stylesDetails.default.timesIconDetails}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={stylesDetails.default.touchDetails}
            onPress={() => {
              navigation.navigate('FixInfoDetailsComponent', {
                address: address,
                lat: latitude,
                lng: longitude,
                city: city,
              });
            }}>
            <Text style={stylesDetails.default.textTouchDetails}>
              Xác nhận địa chỉ
            </Text>
          </TouchableOpacity>
          <Text style={stylesDetails.default.titleAddressDetails}>Địa Chỉ</Text>
          <Text style={stylesDetails.default.textDetailsAddress}>
            {address}
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default LocationComponent;
