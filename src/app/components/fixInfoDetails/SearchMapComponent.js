/* eslint-disable prettier/prettier */
import {
  faChevronLeft,
  faExternalLinkAlt,
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

// const APIKEY = '8-5SOefOHojoGybtR_RWzvEpYhcAdbdX-HLTX2cqcVg';
const apiHistory = 'https://history-search-map.herokuapp.com/api/history';
const apiKey = 'dJFdCdCFCXpUHfhlyWyv3h8uAmLaTRn15TEAVoF2';

const LocationResult = ({
  district,
  address,
  navigation,
  place_id,
  latitude,
  longitude,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (place_id !== undefined) {
          fetch(
            `https://rsapi.goong.io/Place/Detail?place_id=${place_id}&api_key=${apiKey}`,
          )
            .then(res => res.json())
            .then(local => {
              navigation.navigate('CurrentLocationComponent', {
                lat: local.result.geometry.location.lat,
                lng: local.result.geometry.location.lng,
                city: district,
                address: address,
                history: true,
              });
            });
        } else {
          navigation.navigate('CurrentLocationComponent', {
            lat: latitude,
            lng: longitude,
            city: district,
            address: address,
            history: true,
          });
        }
      }}
      style={stylesBodySearch.default.suggestContainer}>
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
  const [isSuggest, setIsSuggest] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(apiHistory)
      .then(res => res.json())
      .then(json => {
        setHistory(json.reverse().slice(0, 5));
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://rsapi.goong.io/Place/AutoComplete?api_key=${apiKey}&input=${searchValue}`,
    )
      .then(res => res.json())
      .then(json => {
        if (searchValue !== '') {
          setIsSuggest(true);
          setResult(json.predictions);
          fetch(
            `https://rsapi.goong.io/Place/Detail?place_id=${json.predictions[0].place_id}&api_key=${apiKey}`,
          )
            .then(res => res.json())
            .then(local => {
              setLatitude(local.result.geometry.location.lat);
              setLongitude(local.result.geometry.location.lng);
              setCity(local.result.name);
              setAddress(local.result.formatted_address);
            });
        }
      });

    return () => {};
  }, [searchValue]);

  let renderItemSearch = ({item, index}) => {
    return (
      <View>
        <LocationResult
          district={item.structured_formatting.main_text}
          address={item.structured_formatting.secondary_text}
          navigation={navigation}
          place_id={item.place_id}
        />
      </View>
    );
  };

  let renderItemHistory = ({item, index}) => {
    return (
      <View>
        <LocationResult
          district={item.city}
          address={item.address}
          latitude={item.latitude}
          longitude={item.longitude}
          navigation={navigation}
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
              lat: route.params.lat,
              lng: route.params.lng,
              city: route.params.city,
              address: route.params.address,
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
            }}
            onSubmitEditing={() => {
              navigation.navigate('CurrentLocationComponent', {
                address: address,
                lat: latitude,
                lng: longitude,
                city: city,
                history: true,
              });
            }}
            keyboardType="email-address"
          />
        </View>
      </View>
      {isSuggest === false ? (
        <View>
          <Text style={stylesBodySearch.default.textTitle}>Gần đây</Text>
          {/* FlatList History */}
          <FlatList
            data={history}
            horizontal={false}
            renderItem={renderItemHistory}
          />
        </View>
      ) : (
        <View />
      )}
      {/* FlatList Search */}
      <View>
        <FlatList
          data={result}
          horizontal={false}
          renderItem={renderItemSearch}
        />
      </View>
    </View>
  );
};

export default SearchMapComponent;
