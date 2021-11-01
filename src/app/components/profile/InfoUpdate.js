/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {height, width} from '../../assets/base';
import avatar from '../../assets/image/mechanic.jpg';
const InfoUpdateComponent = ({route}) => {
  return (
    <View>
      {/* Header */}
      <LinearGradient
        colors={['#fe8c00', '#f83600']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.headerLinearContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Chỉnh sửa thông tin</Text>
        </View>
      </LinearGradient>
      {/* Body */}
      <View>
        <View style={styles.bodyAvatarContainer}>
          <Image source={avatar} style={styles.bodyAvatarImage} />
          <TouchableOpacity style={styles.bodyAvatarUploadContainer}>
            <Text style={styles.bodyAvatarUploadText}>Tải ảnh lên</Text>
          </TouchableOpacity>
        </View>
        {/* Item */}
        <View>

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
  },
  headerText: {
    fontSize: 23,
    fontWeight: '700',
    bottom: 3,
    color: '#fff',
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
});
export default InfoUpdateComponent;
