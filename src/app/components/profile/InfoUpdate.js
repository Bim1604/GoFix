/* eslint-disable prettier/prettier */
import {
  faChevronLeft,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {height, width} from '../../assets/base';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const apiUser = 'https://history-search-map.herokuapp.com/api/user';
import {launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const InfoUpdateComponent = ({navigation, route}) => {
  const reference = storage().ref('test.jpg');
  const [photo, setPhoto] = useState();
  const [id, setID] = useState(route.params.id);
  const [phone, setPhone] = useState(route.params.phone);
  const [avatar, setAvatar] = useState(
    'https://static2.yan.vn/YanNews/2167221/202003/dan-mang-du-trend-thiet-ke-avatar-du-kieu-day-mau-sac-tu-anh-mac-dinh-f4781c7a.jpg',
  );
  const [fullName, setFullName] = useState(route.fullName);
  const [gender, setGender] = useState(route.gender);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [DOB, setDOB] = useState(route.DOB);
  let checkPhone = false;
  // get api
  useEffect(() => {
    fetch(apiUser)
      .then(res => res.json())
      .then(json => {
        for (let index = 0; index < json.length; index++) {
          if (id === json[index].id) {
            setID(json[index].id);
            setPhone(json[index].phone);
            setAvatar(json[index].avatar);
            setFullName(json[index].fullName);
            setGender(json[index].gender);
            setDOB(json[index].DOB);
          }
        }
      });
  }, [id]);
  // Update API
  const UpdateAPIUser = async () => {
    await fetch(`https://history-search-map.herokuapp.com/api/user/${id}`, {
      method: 'PATCH',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        fullName: fullName,
        avatar: avatar,
        gender: gender,
        DOB: DOB,
        phone: phone,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(success => console.log(success));
  };
  console.log(avatar);
  // Check phone
  const checkPhoneExist = () => {
    fetch(apiUser)
      .then(res => res.json())
      .then(json => {
        for (let index = 0; index < json.length; index++) {
          if (json[index].phone === phone && json[index].id !== id) {
            alert('Số điện thoại đã được đăng kí');
            checkPhone = true;
          }
        }
        if (!checkPhone) {
          UpdateAPIUser();
          navigation.navigate('ProfileComponent', {
            phone: phone,
            avatar: avatar,
            fullName: fullName,
            gender: gender,
            DOB: DOB,
          });
        }
      });
  };
  return (
    <View>
      {/* Header */}
      <LinearGradient
        colors={['#fe8c00', '#f83600']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.headerLinearContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <FontAwesomeIcon icon={faChevronLeft} size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Chỉnh sửa thông tin</Text>
        </View>
      </LinearGradient>
      {/* Body */}
      <View>
        <View style={styles.bodyAvatarContainer}>
          <Image
            source={{
              uri:
                route.params.avatar === undefined
                  ? 'https://static2.yan.vn/YanNews/2167221/202003/dan-mang-du-trend-thiet-ke-avatar-du-kieu-day-mau-sac-tu-anh-mac-dinh-f4781c7a.jpg'
                  : route.params.avatar,
            }}
            style={styles.bodyAvatarImage}
          />
          <TouchableOpacity
            style={styles.bodyAvatarUploadContainer}
            onPress={async () => {
              await launchCamera(
                {
                  mediaType: 'photo',
                  quality: 1,
                  includeBase64: true,
                  saveToPhotos: true,
                },
                res => {
                  console.log(res.assets[0].fileName);
                  console.log(res.assets[0].uri);
                  storage()
                    .ref(res.assets[0].fileName)
                    .putFile(res.assets[0].uri)
                    .then(async () => {
                      console.log(3);
                      const url = await storage()
                        .ref(res.assets[0].fileName)
                        .getDownloadURL();
                      console.log(url);
                      setAvatar(url);
                    });
                },
              );
            }}>
            <Text>Tải ảnh lên</Text>
          </TouchableOpacity>
        </View>
        {/* Item */}
        <View style={styles.bodyItemContainer}>
          {/* Phone */}
          <View style={styles.bodyItemDetailsContainer}>
            <View style={styles.bodyItemTitleContainer}>
              <FontAwesomeIcon icon={faPhone} size={20} color="#FF9311" />
              <Text style={styles.bodyItemTitleText}> Số điện thoại</Text>
            </View>
            <TextInput
              onChangeText={setPhone}
              value={phone}
              onChange={text => setPhone(text)}
              style={styles.bodyItemTitleTextInput}
            />
          </View>
          {/* Full Name */}
          <View style={styles.bodyItemDetailsContainer}>
            <View style={styles.bodyItemTitleContainer}>
              <FontAwesomeIcon icon={faUser} color="#FF9311" size={20} />
              <Text style={styles.bodyItemTitleText}> Họ và tên</Text>
            </View>
            <TextInput
              onChangeText={setFullName}
              value={fullName}
              onChange={text => setFullName(text)}
              style={styles.bodyItemTitleTextInput}
            />
          </View>
          {/* Gender */}
          <View style={styles.bodyItemDetailsContainer}>
            <View style={styles.bodyItemTitleContainer}>
              <FontAwesomeIcon icon={faUser} color="#FF9311" size={20} />
              <Text style={styles.bodyItemTitleText}> Giới tính</Text>
            </View>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
              <Picker.Item label="Nam" value="Nam" />
              <Picker.Item label="Nữ" value="Nữ" />
            </Picker>
          </View>
          {/* DOB */}
          <View style={styles.bodyItemsDOBContainer}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={text => {
                var date = text.getDate();
                var month = text.getMonth() + 1;
                var year = text.getFullYear();
                setDatePickerVisibility(false);
                setDOB(date + '/' + month + '/' + year);
              }}
              onCancel={() => setDatePickerVisibility(false)}
            />
            <View style={styles.bodyItemDOBContainer}>
              <FontAwesomeIcon icon={faUser} color="#FF9311" size={20} />
              <Text style={styles.bodyItemTitleText}> Ngày sinh</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setDatePickerVisibility(true);
              }}>
              <Text>
                {DOB === '' ? (
                  <Text style={styles.bodyItemDOBText}>Hãy chọn ngày sinh</Text>
                ) : (
                  <Text style={styles.bodyItemDOBText}>{DOB}</Text>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Button update */}
        <TouchableOpacity
          onPress={() => {
            checkPhoneExist();
          }}
          style={styles.bodyInfoUpdateContainer}>
          <Text style={styles.bodyInfoUpdateText}>Lưu thông tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // Header
  headerLinearContainer: {
    height: height / 13,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  headerText: {
    fontSize: 23,
    fontWeight: '700',
    bottom: 3,
    color: '#fff',
    marginLeft: width / 6,
  },
  //   Body
  // Avatar
  bodyAvatarContainer: {
    backgroundColor: '#fff',
    height: height / 3.5,
    paddingTop: height / 20,
  },
  bodyAvatarImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  bodyAvatarUploadContainer: {
    marginTop: height / 50,
    alignSelf: 'center',
    width: width / 3,
    borderWidth: 1,
    height: height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#696969',
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  bodyAvatarUploadText: {
    color: '#696969',
    fontSize: 18,
  },
  // Body item
  bodyItemContainer: {
    backgroundColor: '#fff',
    height: height / 1.9,
  },
  bodyItemDetailsContainer: {
    marginHorizontal: width / 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginBottom: height / 50,
  },
  bodyItemTitleContainer: {
    flexDirection: 'row',
  },
  bodyItemTitleText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: width / 80,
  },
  bodyItemTitleTextInput: {
    fontSize: 18,
    fontWeight: '700',
    color: '#696969',
  },
  // DOB
  bodyItemsDOBContainer: {
    marginHorizontal: width / 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginBottom: height / 50,
    paddingBottom: height / 50,
  },
  bodyItemDOBContainer: {
    flexDirection: 'row',
    marginBottom: height / 80,
  },
  bodyItemDOBText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#696969',
  },
  // Update Button
  bodyInfoUpdateContainer: {
    marginHorizontal: width / 30,
    borderWidth: 1,
    borderColor: '#FF9311',
    backgroundColor: '#FF9311',
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 15,
    borderRadius: 10,
  },
  bodyInfoUpdateText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
export default InfoUpdateComponent;
