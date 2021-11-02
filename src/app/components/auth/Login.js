/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import logo from '../../assets/image/Logo.png';
import {height, width} from '../../assets/base';
const apiUser = 'https://history-search-map.herokuapp.com/api/user';

const LoginComponent = ({navigation, setFullName, setInitPhone}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  let checkVar = false;
  const checkLogin = async () => {
    await fetch(apiUser)
      .then(res => res.json())
      .then(json => {
        for (let index = 0; index < json.length; index++) {
          if (
            phone === json[index].phone &&
            password === json[index].password
          ) {
            setInitPhone(json[index].phone);
            setFullName(json[index].fullName);
            checkVar = true;
          }
        }
      });
    if (!checkVar) {
      alert('Số điện thoại hoặc mật khẩu không chính xác');
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLogoContainer}>
          <Image source={logo} style={styles.headerLogoImage} />
        </View>
        <Text style={styles.headerLogoTitle}>GoFix</Text>
        <Text style={styles.headerLogoText}>
          Sửa xe nhanh chóng và tiện lợi
        </Text>
      </View>
      {/* Body */}
      <View style={styles.bodyContainer}>
        <View style={styles.bodyContentContainer}>
          <Text style={styles.bodyRegisTitle}>Số điện thoại</Text>
          <TextInput
            onChangeText={setPhone}
            value={phone}
            onChange={text => setPhone(text)}
            style={styles.bodyRegisTextInput}
            placeholder="Nhập số điện thoại"
          />
          <Text style={styles.bodyRegisTitle}>Mật khẩu</Text>
          <TextInput
            onChangeText={setPassword}
            value={password}
            onChange={text => setPassword(text)}
            style={styles.bodyRegisTextInput}
            placeholder="Nhập mật khẩu"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            checkLogin();
          }}
          style={styles.bodyRegisButton}>
          <Text style={styles.bodyRegisButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bodyRouteLogin}
          onPress={() => {
            navigation.navigate('RegisComponent');
          }}>
          <Text style={styles.bodyRouteText_left}>Bạn chưa có tài khoản? </Text>
          <Text style={styles.bodyRouteText_right}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: height,
    width: width,
  },
  //   header
  headerContainer: {
    height: height / 2.5,
    paddingTop: height / 20,
  },
  headerLogoContainer: {
    alignItems: 'center',
  },
  headerLogoImage: {
    width: 130,
    height: 130,
  },
  headerLogoTitle: {
    alignSelf: 'center',
    fontSize: 60,
    fontWeight: '700',
    color: '#ED7D31',
  },
  headerLogoText: {
    fontSize: 22,
    alignSelf: 'center',
    color: '#843C0C',
    fontWeight: '700',
  },
  //   body
  bodyContainer: {
    backgroundColor: '#FF9311',
    height: height / 1.5,
    paddingTop: height / 30,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  bodyContentContainer: {
    // alignItems: 'center',
  },
  bodyRegisTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: width / 10,
    marginBottom: height / 120,
    marginTop: height / 120,
  },
  bodyRegisTextInput: {
    backgroundColor: '#fff',
    marginHorizontal: width / 10,
    borderRadius: 10,
    paddingLeft: 15,
    height: height / 20,
  },
  //   Button
  bodyRegisButton: {
    backgroundColor: '#DF6613',
    marginHorizontal: width / 10,
    marginTop: height / 40,
    height: height / 17,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DF6613',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyRegisButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  //   Route
  bodyRouteLogin: {
    marginTop: height / 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bodyRouteText_left: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  bodyRouteText_right: {
    fontSize: 18,
    color: '#DF6613',
    fontWeight: '700',
  },
});

export default LoginComponent;
