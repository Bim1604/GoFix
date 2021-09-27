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
  const scrollRef = useRef();
  const [address, setAddress] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [city, setCity] = useState();
  const [receive, setReceive] = useState(false);

  //  receive address by route
  if (route.params.address !== undefined) {
    if (receive === false) {
      console.log(3);
      setAddress(route.params.address);
      setLatitude(route.params.lat);
      setLongitude(route.params.lng);
      setCity(route.params.city);
      setReceive(true);
    }
  }

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(location => {
      setLatitude(location.latitude);
      setLongitude(location.longitude);
      fetch(
        `https://rsapi.goong.io/Geocode?latlng=${location.latitude},${location.longitude}&api_key=${apiKey}`,
      )
        .then(res => res.json())
        .then(local => {
          setAddress(local.results[0].formatted_address);
          setCity(local.results[0].address_components[2].long_name);
        });
    });
  }, []);

  return (
    <View style={stylesBodyBase.default.container}>
      <ScrollView ref={scrollRef}>
        <HeaderComponent navigation={navigation}/>
        <View style={stylesBodyBase.default.bodyContainer}>
          <BodyBase address={address} city={city} latitude={latitude} longitude={longitude} route={route} navigation={navigation}/>
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
          />
          <Text style={stylesBodyBase.default.bodyTitle}>Hình ảnh mô tả</Text>
          <ImageDescription navigation={navigation} />
        </View>
      </ScrollView>
      <BottomView
        description={description}
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
      />
    </View>
  );
};

export default FixInfoDetailsComponent;
