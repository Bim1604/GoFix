/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {height, width} from '../../assets/base';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import mechanic from '../../assets/image/XeMay2.png';
import avatar from '../../assets/image/mechanic.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import cancelPhone from '../../assets/image/242275837_1784231768445384_2902697158299168411_n.png';

const WaitingMechanic = ({navigation, route}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  useEffect(() => {
    setLatitude(route.params.latitude);
    setLongitude(route.params.longitude);
  }, [route.params.latitude, route.params.longitude]);

  return (
    <View style={styles.container}>
      {isLoaded === false ? (
        <View style={styles.cancelContainer}>
          <View>
            <ActivityIndicator
              style={styles.loadingIcon}
              size={150}
              color="#fb6100"
            />
          </View>
          <Text style={styles.loadingText}>Đang tìm thợ sửa xe...</Text>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => {
              navigation.navigate('FixInfoDetailsComponent', {
                cancel: true,
              });
            }}>
            <Text style={styles.cancelText}>Hủy tìm kiếm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <AcceptComponent
          latUser={latitude}
          lngUser={longitude}
          navigation={navigation}
          city={route.params.city}
          address={route.params.address}
        />
      )}
    </View>
  );
};

const AcceptComponent = ({latUser, lngUser, navigation, address, city}) => {
  const [latAverage, setLatAverage] = useState(1);
  const [lngAverage, setLngAverage] = useState(1);
  const latMechanic = latUser + 0.0675;
  const lngMechanic = lngUser + 0.0035;
  const LONGITUDE_DELTA = (lngMechanic - lngUser) / (lngUser / lngMechanic / 2);
  const LATITUDE_DELTA = (latMechanic - latUser) / (latUser / latMechanic / 2);

  useEffect(() => {
    if (latUser > latMechanic) {
      setLatAverage(latMechanic + (latUser - latMechanic) / 2);
    } else {
      setLatAverage(latUser + (latMechanic - latUser) / 2);
    }
    if (lngUser > lngMechanic) {
      setLngAverage(lngMechanic + (lngUser - lngMechanic) / 2);
    } else {
      setLngAverage(lngUser + (lngMechanic - lngUser) / 2);
    }
  }, [latMechanic, latUser, lngMechanic, lngUser]);

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={{
          latitude: latAverage,
          longitude: lngAverage,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <Marker
          pinColor="#fb6100"
          coordinate={{
            latitude: latUser,
            longitude: lngUser,
          }}
          title={'Your Location'}
          description={'Bạn đang ở đây'}
          draggable
        />
        <Marker
          coordinate={{
            latitude: latMechanic,
            longitude: lngMechanic,
          }}
          title={"Mechanic 's Location"}
          description={'Người sửa xe ở đây'}
          image={mechanic}
          draggable
        />
      </MapView>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomHeaderContainer}>
          <View style={styles.bottomHeaderImageContainer}>
            <Image source={avatar} style={styles.bottomHeaderImage} />
          </View>
          <View style={styles.bottomHeaderTextContainer}>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomHeaderTextName}>Trần Thị Mộng Du</Text>
              <Text style={styles.bottomHeaderText}>Tổng: 400000Đ</Text>
            </View>
            <Text style={styles.bottomHeaderText}>0971547522</Text>
            <Text style={styles.bottomHeaderText}>
              123 Lê Văn Việt, quận 9, thành phố Hồ Chí Minh
            </Text>
          </View>
        </View>
        <View style={styles.bottomBodyContainer}>
          <TouchableOpacity style={styles.bottomBodyButtonCall}>
            <FontAwesomeIcon icon={faPhoneAlt} color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomBodyButtonCancel}
            onPress={() => {
              navigation.navigate('FixInfoDetailsComponent', {
                address: address,
                lat: latUser,
                lng: lngUser,
                city: city,
              });
            }}>
            <Image source={cancelPhone} style={styles.cancelButtonImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cancelContainer: {
    alignItems: 'center',
  },
  loadingIcon: {
    marginTop: height / 3,
    height: 10,
  },
  loadingText: {
    marginTop: height / 8,
    fontSize: 20,
  },
  buttonCancel: {
    backgroundColor: '#fb6100',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fb6100',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 50,
  },
  cancelText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '700',
  },
  // Map
  mapContainer: {
    height: height,
    width: width,
  },
  map: {
    height: '80%',
    width: '100%',
  },
  // Marker
  markerMechanic: {
    width: 33,
    height: 33,
  },
  // bottom
  bottomContainer: {
    height: '70%',
    width: '100%',
    backgroundColor: '#fff',
  },
  bottomHeaderContainer: {
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
  },
  bottomHeaderImageContainer: {
    margin: 3,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#fb6100',
  },
  bottomHeaderImage: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 40,
  },
  bottomTextContainer: {
    flexDirection: 'row',
  },
  bottomHeaderTextContainer: {
    marginLeft: 15,
    flexDirection: 'column',
    width: '80%',
    height: 60,
  },
  bottomHeaderText: {
    fontSize: 14,
    marginTop: 3,
  },
  bottomHeaderTextName: {
    fontSize: 14,
    marginTop: 3,
    marginRight: 80,
  },
  //  bottom body
  bottomBodyContainer: {
    flexDirection: 'row',
  },
  bottomBodyButtonCall: {
    borderWidth: 1,
    backgroundColor: '#3ae52b',
    borderColor: '#3ae52b',
    borderRadius: 10,
    width: 300,
    marginLeft: 15,
    marginRight: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonImage: {
    width: 40,
    height: 40,
  },
  bottomBodyButtonCancel: {
    borderWidth: 1,
    backgroundColor: '#ff0000',
    borderColor: '#ff0000',
    borderRadius: 10,
    width: 75,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBodyButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default WaitingMechanic;
