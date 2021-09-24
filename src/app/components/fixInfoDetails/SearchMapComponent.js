/* eslint-disable prettier/prettier */
import {
  faChevronLeft,
  faExternalLinkAlt,
  faLocationArrow,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  stylesHeaderSearch,
  stylesBodySearch,
} from '../../styles/fixInfoDetails/map/index';
import {FlatList} from 'react-native-gesture-handler';
const APIKEY = '8-5SOefOHojoGybtR_RWzvEpYhcAdbdX-HLTX2cqcVg';

const LocationResult = ({district, address}) => {
  return (
    <TouchableOpacity style={stylesBodySearch.default.suggestContainer}>
      <View style={stylesBodySearch.default.suggestIconContainer}>
        <View style={stylesBodySearch.default.suggestIconCircle}>
          <FontAwesomeIcon
            style={stylesBodySearch.default.suggestIcon}
            icon={faMapMarkerAlt}
            size={23}
          />
        </View>
      </View>
      <View style={stylesBodySearch.default.suggestTextContainer}>
        <Text style={stylesBodySearch.default.suggestTitle}>{district}</Text>
        <Text style={stylesBodySearch.default.suggestText}>{address}</Text>
      </View>
      <View style={stylesBodySearch.default.suggestIconContainer}>
        <FontAwesomeIcon
          icon={faExternalLinkAlt}
          style={stylesBodySearch.default.suggestIcon}
          size={23}
        />
      </View>
    </TouchableOpacity>
  );
};

const SearchMapComponent = ({navigation, route}) => {
  const [searchValue, setSearchValue] = useState('');
  const [address, setAddress] = useState(route.params.address);
  const [latitude, setLatitude] = useState(route.params.lat);
  const [longitude, setLongitude] = useState(route.params.lng);
  const [city, setCity] = useState(route.params.city);
  const [result, setResult] = useState([]);
  const numberOfRs = 10;
  const [isSuggest, setIsSuggest] = useState(false);

  useEffect(() => {
    fetch(
      `https://geocoder.ls.hereapi.com/search/6.2/geocode.json?languages=en-US&maxresults=${numberOfRs}&searchtext=${searchValue}&apiKey=${APIKEY}`,
    )
      .then(res => res.json())
      .then(json => {
        if (json.Response !== undefined) {
          setResult(json.Response.View[0].Result);
          setLatitude(
            json.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
          );
          setLongitude(
            json.Response.View[0].Result[0].Location.DisplayPosition.Longitude,
          );
          setCity(json.Response.View[0].Result[0].Location.Address.District);
          setAddress(json.Response.View[0].Result[0].Location.Address.Label);
        }
      });
    return () => {};
  }, [searchValue]);

  let renderItem = ({item, index}) => {
    return (
      <View>
        <LocationResult
          district={
            item.Location.Address.District === undefined
              ? item.Location.Address.State === undefined
                ? item.Location.Address.County !== undefined
                  ? item.Location.Address.County
                  : item.Location.Address.Country
                : item.Location.Address.State
              : item.Location.Address.District
          }
          address={item.Location.Address.Label}
        />
      </View>
    );
  };

  return (
    <View style={stylesHeaderSearch.default.container}>
      <View style={stylesHeaderSearch.default.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CurrentLocationComponent', {
              lat: latitude,
              lng: longitude,
              city: city,
              address: address,
            });
          }}>
          <FontAwesomeIcon icon={faChevronLeft} size={22} />
        </TouchableOpacity>
        <View style={stylesHeaderSearch.default.headerTextInput}>
          <TextInput
            style={stylesHeaderSearch.default.headerText}
            placeholder="Tìm kiếm"
            onChangeText={text => {
              setSearchValue(text);
              if (address !== '') {
                setIsSuggest(true);
              }
            }}
            onBlur={() => {
              navigation.navigate('CurrentLocationComponent', {
                address: address,
                lat: latitude,
                lng: longitude,
                city: city,
              });
            }}
            keyboardType="email-address"
          />
        </View>
      </View>
      {isSuggest === false ? (
        <Text style={stylesBodySearch.default.textTitle}>Gần đây</Text>
      ) : (
        <View />
      )}
      {/* Flat Lish history */}
      <View>
        <FlatList data={result} horizontal={false} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default SearchMapComponent;
