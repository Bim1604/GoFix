/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import logo from '../../assets/image/Logo.png';
import {height, width} from '../../assets/base';
const apiUser = 'https://history-search-map.herokuapp.com/api/user';
const RegisComponent = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [fullName, setFullName] = useState('');
  const REGEX_PHONE = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  let checkPhone = false;
  // Kiểm tra số điện thoại đã tồn tại
  const checkPhoneExist = () => {
    fetch(apiUser)
      .then(res => res.json())
      .then(json => {
        for (let index = 0; index < json.length; index++) {
          if (json[index].phone === phone) {
            alert('Số điện thoại đã được đăng kí');
            checkPhone = true;
          }
        }
        if (!checkPhone) {
          addUser();
        }
      });
  };

  //  Kiểm tra hợp lệ password
  function checkPassword() {
    if (password === rePassword && password !== '') {
      if (phone !== '' && fullName !== '') {
        if (REGEX_PHONE.test(phone)) {
          checkPhoneExist();
        } else {
          alert('Vui lòng nhập số điện thoại hợp lệ');
        }
      } else {
        alert('Vui lòng nhập đầy đủ thông tin');
      }
    } else {
      alert('Mật khẩu và xác nhận mật khẩu không khớp');
    }
  }

  const addUser = async () => {
    await fetch(apiUser, {
      method: 'POST',
      body: JSON.stringify({
        phone: phone,
        password: password,
        fullName: fullName,
        role: 'cus',
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigation.navigate('LoginComponent', {
          phone: phone,
          password: password,
        });
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Đăng ký thất bại');
      });
  };
  return (
    <ScrollView>
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
            <Text style={styles.bodyRegisTitle}>Họ và tên</Text>
            <TextInput
              style={styles.bodyRegisTextInput}
              onChangeText={setFullName}
              value={fullName}
              onChange={text => setFullName(text)}
              placeholder="Nhập họ và tên"
            />
            <Text style={styles.bodyRegisTitle}>Số điện thoại</Text>
            <TextInput
              style={styles.bodyRegisTextInput}
              onChangeText={setPhone}
              value={phone}
              keyboardType="numeric"
              onChange={text => setPhone(text)}
              placeholder="Nhập số điện thoại"
            />
            <Text style={styles.bodyRegisTitle}>Mật khẩu</Text>
            <TextInput
              style={styles.bodyRegisTextInput}
              onChangeText={setPassword}
              value={password}
              onChange={text => setPassword(text)}
              placeholder="Nhập mật khẩu"
            />
            <Text style={styles.bodyRegisTitle}>Xác nhận mật khẩu</Text>
            <TextInput
              style={styles.bodyRegisTextInput}
              onChangeText={setRePassword}
              value={rePassword}
              onChange={text => setRePassword(text)}
              placeholder="Nhập lại mật khẩu"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              checkPassword();
            }}
            style={styles.bodyRegisButton}>
            <Text style={styles.bodyRegisButtonText}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bodyRouteLogin}
            onPress={() => {
              navigation.navigate('LoginComponent');
            }}>
            <Text style={styles.bodyRouteText_left}>Bạn đã có tài khoản? </Text>
            <Text style={styles.bodyRouteText_right}>Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    fontSize: 12,
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

export default RegisComponent;
