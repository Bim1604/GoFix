/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderComponent from './Header';
import {useRef, useEffect} from 'react';
import {stylesBodyBase} from '../../styles/fixInfoDetails/index';
import BodyBase from './BodyBase';
import ImageDescription from './ImageDescription';
import BottomView from './BottomView';
import BodyFormItem from './BodyFormItem';
import GetLocation from 'react-native-get-location';

const apiKey = 'dJFdCdCFCXpUHfhlyWyv3h8uAmLaTRn15TEAVoF2';
const FixInfoDetailsComponent = ({navigation, route}) => {
  const [readyHetBinh, setReadyHetBinh] = useState(false);
  const [readyBeBanh, setReadyBeBanh] = useState(false);
  const [readyChetMay, setReadyChetMay] = useState(false);
  const [readyTooHot, setReadyTooHot] = useState(false);
  const [readyLopXe, setReadyLopXe] = useState(false);
  const [readyBugi, setReadyBugi] = useState(false);
  const [checkDescription, setCheckDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionDetails, setDescriptionDetails] = useState('');
  const scrollRef = useRef();
  const [address, setAddress] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [city, setCity] = useState();
  const [cate, setCate] = useState(route.params.cate);
  const [name, setName] = useState(route.params.name);
  const [id, setID] = useState(route.params.id);

  useEffect(() => {
    setAddress(route.params.address);
    setLatitude(route.params.lat);
    setLongitude(route.params.lng);
    setCity(route.params.city);
  }, [
    route.params.address,
    route.params.city,
    route.params.lat,
    route.params.lng,
  ]);

  useEffect(() => {
    // GetLocation.getCurrentPosition({
    //   enableHighAccuracy: true,
    //   maximumAge: 300000,
    //   timeout: 100000,
    // }).then(location => {
    setLatitude(10.838413);
    setLongitude(106.833139);
    fetch(
      // `https://rsapi.goong.io/Geocode?latlng=${location.latitude},${location.longitude}&api_key=${apiKey}`,
      `https://rsapi.goong.io/Geocode?latlng=10.838413,106.833139&api_key=${apiKey}`,
    )
      .then(res => res.json())
      .then(local => {
        setAddress(local.results[0].formatted_address);
        setCity(local.results[0].address_components[2].long_name);
      });
    // });
  }, []);

  return (
    <View style={stylesBodyBase.default.container}>
      <ScrollView ref={scrollRef}>
        <HeaderComponent navigation={navigation} />
        <View style={stylesBodyBase.default.bodyContainer}>
          <BodyBase
            address={address}
            city={city}
            latitude={latitude}
            longitude={longitude}
            navigation={navigation}
            route={route}
          />
          <BodyFormItem
            setCheckDescription={setCheckDescription}
            setDescription={setDescription}
            setReadyBeBanh={setReadyBeBanh}
            setReadyBugi={setReadyBugi}
            setReadyChetMay={setReadyChetMay}
            setReadyHetBinh={setReadyHetBinh}
            setReadyLopXe={setReadyLopXe}
            setReadyTooHot={setReadyTooHot}
            checkDescription={checkDescription}
            description={description}
            scrollRef={scrollRef}
            descriptionDetails={descriptionDetails}
            setDescriptionDetails={setDescriptionDetails}
          />
          <Text style={stylesBodyBase.default.bodyTitle}>Hình ảnh mô tả</Text>
          <ImageDescription navigation={navigation} />
        </View>
      </ScrollView>
      <BottomView
        description={description}
        descriptionDetails={descriptionDetails}
        readyBeBanh={readyBeBanh}
        readyBugi={readyBugi}
        readyChetMay={readyChetMay}
        readyHetBinh={readyHetBinh}
        readyLopXe={readyLopXe}
        readyTooHot={readyTooHot}
        navigation={navigation}
        lat={latitude}
        lng={longitude}
        address={address}
        city={city}
        cate={cate}
        name={name}
        id={route.params.id}
      />
    </View>
  );
};

export default FixInfoDetailsComponent;
