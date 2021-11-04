/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {height, width} from '../../assets/base';
import MapView, {Marker} from 'react-native-maps';
import mechanic from '../../assets/image/XeMay2.png';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faMapMarkerAlt,
  faPhoneAlt,
  faUser,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import call from 'react-native-phone-call';
const apiAccept = 'https://history-search-map.herokuapp.com/api/mechanicAccept';

const WaitingMechanic = ({navigation, route}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [readyHetBinh, setReadyHetBinh] = useState('');
  const [readyBeBanh, setReadyBeBanh] = useState('');
  const [readyChetMay, setReadyChetMay] = useState('');
  const [readyTooHot, setReadyTooHot] = useState('');
  const [readyLopXe, setReadyLopXe] = useState('');
  const [readyBugi, setReadyBugi] = useState('');
  const [description, setDescription] = useState('');
  const [totalCost, setTotalCost] = useState();
  const [dataMechanic, setDataMechanic] = useState({
    fullName: '',
    avatar:
      'https://static2.yan.vn/YanNews/2167221/202003/dan-mang-du-trend-thiet-ke-avatar-du-kieu-day-mau-sac-tu-anh-mac-dinh-f4781c7a.jpg',
    address: '',
    phone: '',
    userID: '',
  });
  useEffect(() => {
    fetch(apiAccept)
      .then(res => res.json())
      .then(json => {
        setDataMechanic(json[0]);
      });
  }, []);
  let total = 0;
  let detailsFixer = [];
  const data = [
    {
      content: readyHetBinh,
      cost: 300,
      isChoose: readyHetBinh === '' ? false : true,
    },
    {
      content: readyBeBanh,
      cost: 300,
      isChoose: readyBeBanh === '' ? false : true,
    },
    {
      content: readyChetMay,
      cost: 70,
      isChoose: readyChetMay === '' ? false : true,
    },
    {
      content: readyTooHot,
      cost: 160,
      isChoose: readyTooHot === '' ? false : true,
    },
    {
      content: readyLopXe,
      cost: 100,
      isChoose: readyLopXe === '' ? false : true,
    },
    {
      content: readyBugi,
      cost: 100,
      isChoose: readyBugi === '' ? false : true,
    },
    {
      content: description,
      cost: 300,
      isChoose: description === '' ? false : true,
    },
  ];

  for (let index = 0; index < data.length; index++) {
    if (data[index].isChoose === true) {
      total = total + data[index].cost;
      detailsFixer.push({text: data[index].content});
    }
  }
  useEffect(() => {
    if (isLoaded === false) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 3000);
    }
  }, [isLoaded]);

  useEffect(() => {
    setLatitude(route.params.latitude);
    setLongitude(route.params.longitude);
    setReadyHetBinh(route.params.hetBinh);
    setReadyBeBanh(route.params.beBanh);
    setReadyChetMay(route.params.chetMay);
    setReadyTooHot(route.params.hopSo);
    setReadyLopXe(route.params.lopXe);
    setReadyBugi(route.params.buGi);
    setDescription(route.params.description);
    setTotalCost(total);
  }, [
    route.params.beBanh,
    route.params.buGi,
    route.params.chetMay,
    route.params.description,
    route.params.hetBinh,
    route.params.hopSo,
    route.params.latitude,
    route.params.longitude,
    route.params.lopXe,
    total,
  ]);

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
              navigation.pop();
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
          data={data}
          totalCost={totalCost}
          detailsFix={detailsFixer}
          dataMechanic={dataMechanic}
          cate={route.params.cate}
          name={route.params.name}
          cusID={route.params.id}
        />
      )}
    </View>
  );
};

const DetailsFixer = ({content, cost}) => {
  return (
    <View style={styles.bottomBodyFixTextContainer}>
      <Text style={styles.bottomBodyFixTextTitle}>{content} </Text>
      <Text style={styles.bottomBodyFixTextCost}>{cost}.000 Đ</Text>
    </View>
  );
};

const AcceptComponent = ({
  latUser,
  lngUser,
  navigation,
  address,
  city,
  data,
  totalCost,
  detailsFix,
  dataMechanic,
  cate,
  name,
  cusID,
}) => {
  const [latAverage, setLatAverage] = useState(1);
  const [lngAverage, setLngAverage] = useState(1);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const latMechanic = latUser + 0.0045;
  const lngMechanic = lngUser + 0.0045;
  const LONGITUDE_DELTA =
    lngUser < lngMechanic
      ? (lngMechanic - lngUser) / (lngUser / lngMechanic / 2)
      : (lngUser - lngMechanic) / (lngUser / lngMechanic / 2);
  const LATITUDE_DELTA =
    latUser < latMechanic
      ? (latMechanic - latUser) / (latUser / latMechanic / 2)
      : (latUser - latMechanic) / (latUser / latMechanic / 2);
  const args = {
    number: dataMechanic.phone,
  };
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
  let renderItem = ({item, index}) => {
    if (item.isChoose === false) {
      return;
    }

    return (
      <View>
        <DetailsFixer content={item.content} cost={item.cost} />
      </View>
    );
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={isShowInfo === true ? styles.map : styles.mapDetailsShow}
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
        {/* Bottom Header */}
        <TouchableOpacity
          style={styles.bottomHeaderContainer}
          onPress={() => {
            setIsShowInfo(prevState => !prevState);
          }}>
          <FontAwesomeIcon
            style={styles.bottomHeaderButton}
            icon={isShowInfo === true ? faAngleDoubleDown : faAngleDoubleUp}
            size={22}
          />
        </TouchableOpacity>
        {/* Bottom Body */}
        <View
          style={
            isShowInfo === true
              ? styles.bottomBodyContainerShow
              : styles.bottomBodyContainer
          }>
          {/* Mechanic info */}
          <View style={styles.bottomBodyTitleTextContainer}>
            <FontAwesomeIcon
              style={styles.bottomBodyIcon}
              icon={faUser}
              size={20}
            />
            <Text style={styles.bottomBodyTitle}>Thông tin thợ sửa</Text>
          </View>
          <View style={styles.bottomBodyUserContainer}>
            <View style={styles.bottomBodyImageContainer}>
              <Image
                source={{
                  uri:
                    dataMechanic.avatar === undefined
                      ? 'https://static2.yan.vn/YanNews/2167221/202003/dan-mang-du-trend-thiet-ke-avatar-du-kieu-day-mau-sac-tu-anh-mac-dinh-f4781c7a.jpg'
                      : dataMechanic.avatar,
                }}
                style={styles.bottomBodyImage}
              />
            </View>
            <View style={styles.bottomBodyTextContainer}>
              <View style={styles.bottomBodyTitleContainer}>
                <Text style={styles.bottomBodyTextName}>
                  {dataMechanic.fullName}
                </Text>
                <Text style={styles.bottomBodyText}>{dataMechanic.phone}</Text>
                <Text style={styles.bottomBodyText}>
                  {dataMechanic.address}
                </Text>
              </View>
            </View>
          </View>
          {isShowInfo === true ? (
            <View>
              <View style={styles.bottomBodyAddressContainer}>
                <View style={styles.bottomBodyTitleTextContainer}>
                  <FontAwesomeIcon
                    style={styles.bottomBodyIcon}
                    icon={faMapMarkerAlt}
                    size={20}
                  />
                  <Text style={styles.bottomBodyTitle}>Địa chỉ của bạn</Text>
                </View>
                <Text style={styles.bottomBodyAddressText}>{address}</Text>
              </View>
              <View style={styles.bottomBodyFixContainer}>
                <View style={styles.bottomBodyTitleTextContainer}>
                  <FontAwesomeIcon
                    style={styles.bottomBodyIcon}
                    icon={faWrench}
                    size={20}
                  />
                  <Text style={styles.bottomBodyTitle}>Chi tiết sửa chữa</Text>
                </View>
                <View>
                  <FlatList data={data} renderItem={renderItem} />
                </View>
              </View>
            </View>
          ) : (
            <View />
          )}
          <View style={styles.bottomBodyTextContainerShow}>
            <Text style={styles.bottomBodyTotalTitle}>Tổng tiền:</Text>
            <Text style={styles.bottomBodyTotalText}>{totalCost}.000 Đ</Text>
          </View>
        </View>
        {/* Bottom Footer */}
        <View style={styles.bottomFooterContainer}>
          <View
            style={
              isShowInfo === true
                ? styles.bottomFooterButtonContainerShow
                : styles.bottomFooterButtonContainer
            }>
            <TouchableOpacity
              style={styles.bottomFooterButtonCall}
              onPress={() => {
                call(args).catch(console.error);
              }}>
              <FontAwesomeIcon icon={faPhoneAlt} color="#fff" size={20} />
            </TouchableOpacity>
          </View>
          {/* Hủy dịch vụ */}
          {isShowInfo === true ? (
            <View style={styles.bottomFooterButtonUnder}>
              <TouchableOpacity
                style={styles.bottomFooterButtonCancel}
                onPress={() => {
                  navigation.navigate('CancelComponent', {
                    id: cusID,
                    price: totalCost,
                    avatar: dataMechanic.avatar,
                    name: dataMechanic.fullName,
                    phone: dataMechanic.phone,
                    detailsFix: detailsFix,
                    mecID: dataMechanic.userID,
                    address: address,
                    cate: cate,
                    vehicleName: name,
                    status: false,
                  });
                }}>
                <Text style={styles.bottomFooterButtonText}>Hủy dịch vụ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomFooterButtonComplete}
                onPress={() => {
                  navigation.navigate('EvaluateComponent', {
                    price: totalCost,
                    name: dataMechanic.fullName,
                    phone: dataMechanic.phone,
                    detailsFix: detailsFix,
                    avatar: dataMechanic.avatar,
                    address: address,
                    cate: cate,
                    vehicleName: name,
                    id: cusID,
                    mecID: dataMechanic.userID,
                  });
                }}>
                <Text style={styles.bottomFooterButtonText}>
                  Xác nhận hoàn thành
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
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
    height: '25%',
    width: '100%',
  },
  mapDetailsShow: {
    height: '60%',
    width: '100%',
  },
  // Marker
  markerMechanic: {
    width: 33,
    height: 33,
  },
  // bottom
  bottomContainer: {
    height: height / 1.5,
    width: width,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor: '#000',
  },
  // Header
  bottomHeaderContainer: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  bottomHeaderButton: {
    color: '#808080',
  },
  // Body
  bottomBodyContainer: {
    flexDirection: 'column',
  },
  bottomBodyContainerShow: {
    flexDirection: 'column',
    height: '75%',
  },
  //  Bottom Body User
  bottomBodyUserContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  // Image
  bottomBodyImageContainer: {
    margin: 3,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#fb6100',
  },
  bottomBodyImage: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 40,
  },
  bottomBodyTextContainer: {
    flexDirection: 'row',
  },
  bottomBodyTitleContainer: {
    marginLeft: 15,
    flexDirection: 'column',
    width: '90%',
    height: 60,
  },
  bottomBodyText: {
    fontSize: 14,
    marginTop: 3,
    color: '#7c7d7e',
  },
  bottomBodyTextName: {
    fontSize: 16,
    marginTop: 3,
    marginRight: 80,
  },
  //  Bottom body address
  bottomBodyAddressContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    paddingBottom: 5,
  },
  bottomBodyTitleTextContainer: {
    flexDirection: 'row',
  },
  bottomBodyIcon: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
    marginRight: 10,
    color: '#fb6100',
  },
  bottomBodyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 5,
  },
  bottomBodyAddressText: {
    paddingLeft: 15,
    marginBottom: 10,
  },
  // Bottom body fixer details
  bottomBodyFixContainer: {
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  bottomBodyFixTextContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    width: width,
    justifyContent: 'space-between',
  },
  bottomBodyFixTextTitle: {
    fontSize: 15,
  },
  bottomBodyFixTextCost: {
    fontSize: 15,
  },
  //  Footer
  //  bottom Footer
  bottomFooterContainer: {
    flexDirection: 'column',
  },
  //  Bottom Body Total
  bottomBodyTextContainerShow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingRight: 10,
    marginBottom: 10,
  },
  bottomBodyTotalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 15,
  },
  bottomBodyTotalText: {
    fontSize: 15,
  },
  // Bottom footer call
  bottomFooterButtonContainer: {
    borderTopColor: '#D3D3D3',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  bottomFooterButtonContainerShow: {
    borderTopColor: '#D3D3D3',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  bottomFooterButtonCall: {
    borderWidth: 1,
    backgroundColor: '#3ae52b',
    borderColor: '#3ae52b',
    borderRadius: 10,
    width: '93%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  // Bottom Footer Cancel
  bottomFooterButtonCancel: {
    borderWidth: 1,
    backgroundColor: '#ff0000',
    borderColor: '#ff0000',
    borderRadius: 10,
    width: width / 2.35,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  // Button Complete
  bottomFooterButtonComplete: {
    borderWidth: 1,
    backgroundColor: '#3399FF',
    borderColor: '#3399FF',
    borderRadius: 10,
    width: width / 2.2,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 10,
  },
  bottomFooterButtonText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  // Button under
  bottomFooterButtonUnder: {
    flexDirection: 'row',
    marginLeft: 15,
  },
});

export default WaitingMechanic;
