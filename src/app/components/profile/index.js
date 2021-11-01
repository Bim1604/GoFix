/* eslint-disable prettier/prettier */
import React from 'react';
import {faChevronRight, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {height, width} from '../../assets/base';
import avatar from '../../assets/image/mechanic.jpg';
import LinearGradient from 'react-native-linear-gradient';
const ProfileComponent = ({route, navigation}) => {
  return (
    <View>
      {/* Header */}
      <LinearGradient
        colors={['#fe8c00', '#f83600']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.headerLinearContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Thông tin cá nhân</Text>
        </View>
      </LinearGradient>
      {/* Body */}
      <View>
        {/* ava */}
        <View style={styles.bodyUserNavContainer}>
          <View style={styles.bodyUserNavImageContainer}>
            <Image source={avatar} style={styles.bodyUserNavImage} />
            <Text style={styles.bodyUserNavText}>{route.params.fullName}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InfoUpdateComponent', {
                  fullName: route.params.fullName,
                  phone: route.params.phone,
                });
              }}
              style={styles.bodyUserEditContainer}>
              <FontAwesomeIcon icon={faPencilAlt} size={20} color="#fff" />
              <Text style={styles.bodyUserEditText}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* details info user*/}
        <TouchableOpacity style={styles.bodyInfoContainer}>
          <Text style={styles.bodyInfoText}>Thông tin cá nhân</Text>
          <FontAwesomeIcon
            style={styles.bodyInfoIcon}
            icon={faChevronRight}
            size={23}
          />
        </TouchableOpacity>
        {/* details info vehicle*/}
        <TouchableOpacity style={styles.bodyInfoContainer}>
          <Text style={styles.bodyInfoText}>Thông tin xe</Text>
          <FontAwesomeIcon
            style={styles.bodyInfoIcon}
            icon={faChevronRight}
            size={23}
          />
        </TouchableOpacity>
        {/* Logout */}
        <TouchableOpacity style={styles.bodyInfoContainer}>
          <Text style={styles.bodyLogoutText}>Đăng xuất</Text>
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
  },
  headerText: {
    fontSize: 23,
    fontWeight: '700',
    bottom: 3,
    color: '#fff',
  },
  // body
  bodyUserNavContainer: {
    height: height / 3.5,
    width: width,
    backgroundColor: '#fff',
    marginBottom: height / 50,
    justifyContent: 'center',
  },
  bodyUserNavImageContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyUserNavImage: {
    height: 95,
    width: 95,
    borderRadius: 50,
  },
  bodyUserNavText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: height / 100,
    marginBottom: height / 100,
  },
  // Button edit
  bodyUserEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fb6201',
    width: width / 2,
    height: height / 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fb6201',
    paddingLeft: width / 30,
  },
  bodyUserEditText: {
    fontSize: 17,
    marginLeft: width / 60,
    color: '#fff',
    fontWeight: '700',
  },
  // Details info
  bodyInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: height / 15,
    alignItems: 'center',
    marginBottom: height / 50,
  },
  bodyInfoText: {
    fontSize: 17,
    fontWeight: '700',
    marginLeft: width / 30,
  },
  bodyInfoIcon: {
    marginRight: width / 30,
    color: '#fb6201',
  },
  // Logout
  bodyLogoutText: {
    color: '#fb6201',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: width / 30,
  },
});
export default ProfileComponent;
