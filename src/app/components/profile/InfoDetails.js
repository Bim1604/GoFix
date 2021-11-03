/* eslint-disable prettier/prettier */
import {
  faChevronLeft,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {height, width} from '../../assets/base';
const InfoDetailsComponent = ({navigation, route}) => {
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
        </View>
        {/* Item */}
        <View style={styles.bodyItemContainer}>
          {/* Phone */}
          <View style={styles.bodyItemsContainer}>
            <View style={styles.bodyItemTitleContainer}>
              <FontAwesomeIcon icon={faPhone} size={20} color="#FF9311" />
              <Text style={styles.bodyItemTitleText}> Số điện thoại</Text>
            </View>
            <Text style={styles.bodyItemContentText}>{route.params.phone}</Text>
          </View>
          {/* Full Name */}
          <View style={styles.bodyItemsContainer}>
            <View style={styles.bodyItemTitleContainer}>
              <FontAwesomeIcon icon={faUser} color="#FF9311" size={20} />
              <Text style={styles.bodyItemTitleText}> Họ và tên</Text>
            </View>
            <Text style={styles.bodyItemContentText}>
              {route.params.fullName}
            </Text>
          </View>
          {/* Gender */}
          <View style={styles.bodyItemsContainer}>
            <View style={styles.bodyItemTitleContainer}>
              <FontAwesomeIcon icon={faUser} color="#FF9311" size={20} />
              <Text style={styles.bodyItemTitleText}> Giới tính</Text>
            </View>
            <Text style={styles.bodyItemContentText}>
              {route.params.gender === undefined
                ? 'Chưa có dữ liệu'
                : route.params.gender}
            </Text>
          </View>
          {/* DOB */}
          <View style={styles.bodyItemsContainer}>
            <View style={styles.bodyItemTitleContainer}>
              <FontAwesomeIcon icon={faUser} color="#FF9311" size={20} />
              <Text style={styles.bodyItemTitleText}> Ngày sinh</Text>
            </View>
            <Text style={styles.bodyItemContentText}>
              {route.params.DOB === undefined
                ? 'Chưa có dữ liệu'
                : route.params.DOB}
            </Text>
          </View>
        </View>
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
    height: 110,
    width: 110,
    borderRadius: 50,
    alignSelf: 'center',
  },
  // Body item
  bodyItemContainer: {
    backgroundColor: '#fff',
    height: height / 1.5,
  },
  bodyItemTitleText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: width / 80,
  },
  // DOB
  bodyItemsContainer: {
    marginHorizontal: width / 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginBottom: height / 50,
    paddingBottom: height / 50,
  },
  bodyItemTitleContainer: {
    flexDirection: 'row',
    marginBottom: height / 80,
  },
  bodyItemContentText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#696969',
  },
});
export default InfoDetailsComponent;
