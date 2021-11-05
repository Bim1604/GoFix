/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderComponent from './Header';
import {width, height} from '../../assets/base';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LinearGradient from 'react-native-linear-gradient';
const dataReason = [
  {
    text: 'Tôi đang bận',
  },
  {
    text: 'Xe đã hoạt động lại bình thường',
  },
  {
    text: 'Tôi phải đợi thợ quá lâu',
  },
  {
    text: 'Thái độ của thợ không tốt',
  },
  {
    text: 'Tôi đã nhập sai thông tin sửa chữa',
  },
  {
    text: 'Thợ quên kết thúc đơn',
  },
  {
    text: 'Lý do khác',
  },
];

const apiHistory = 'https://history-search-map.herokuapp.com/api/historyCustomer';

const CancelComponent = ({navigation, route}) => {
  const [checkAnotherProblem, setCheckAnotherProblem] = useState(false);
  const [checkBusy, setCheckBusy] = useState(false);
  const [checkActiveAgain, setCheckActiveAgain] = useState(false);
  const [checkWaitTooLong, setWaitTooLong] = useState(false);
  const [checkBadAttitude, setBadAttitude] = useState(false);
  const [checkWrongDetails, setCheckWrongDetails] = useState(false);
  const [checkForget, setCheckForget] = useState(false);
  const [anotherProblem, setAnotherProblem] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [time, setTime] = useState('');

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year;
  };
  const getCurrentTime = () => {
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    return hour + ':' + minutes + ':' + seconds;
  };
  useEffect(() => {
    var date = getCurrentDate();
    var timeCurrent = getCurrentTime();
    setTime(timeCurrent + ' ' + date);
  }, []);

  const AddReason = () => {
    fetch(apiHistory, {
      method: 'POST',
      body: JSON.stringify({
        name: route.params.name,
        avatar: route.params.avatar,
        phone: route.params.phone,
        address: route.params.address,
        detailsFix: route.params.detailsFix,
        time: time,
        image: [],
        cusID: route.params.id,
        mecID: route.params.mecID,
        price: route.params.price,
        status: route.params.status,
        motor: route.params.cate !== 'Xe máy' ? '' : route.params.vehicleName,
        car: route.params.cate === 'Xe máy' ? '' : route.params.vehicleName,
        reasonCancel: cancelReason,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {

      })
      .catch(error => {

      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderComponent
        navigation={navigation}
        content="Lý do hủy đơn"
      />
      {/* Body */}
      <View style={styles.bodyContainer}>
        <View style={styles.bodyTitleContainer} />
        <View style={styles.bodyReasonContainer}>
          {dataReason.map((info, index) => (
            <View key={index} style={styles.bodyCheckBoxMiniContainer}>
              <BouncyCheckbox
                style={styles.bodyCheckBox}
                size={20}
                fillColor="#fb6100"
                unfillColor="#FFFFFF"
                disableText
                iconStyle={styles.bodyCheckBoxIcon}
                onPress={() => {
                  if (index === 0) {
                    setCheckBusy(prevState => !prevState);
                    setCancelReason(dataReason[0].text);
                  }
                  if (index === 1) {
                    setCheckActiveAgain(prevState => !prevState);
                    setCancelReason(dataReason[1].text);
                  }
                  if (index === 2) {
                    setWaitTooLong(prevState => !prevState);
                    setCancelReason(dataReason[2].text);
                  }
                  if (index === 3) {
                    setBadAttitude(prevState => !prevState);
                    setCancelReason(dataReason[3].text);
                  }
                  if (index === 4) {
                    setCheckWrongDetails(prevState => !prevState);
                    setCancelReason(dataReason[4].text);
                  }
                  if (index === 5) {
                    setCheckForget(prevState => !prevState);
                    setCancelReason(dataReason[5].text);
                  }
                  if (index === 6) {
                    setCheckAnotherProblem(prev => !prev);
                    setCancelReason(anotherProblem);
                  }
                }}
              />
              <Text style={styles.bodyReasonText}> {info.text}</Text>
            </View>
          ))}
          <View>
            {checkAnotherProblem === true ? (
              <TextInput
                multiline={true}
                style={styles.bodyCheckBoxContent}
                onChangeText={setAnotherProblem}
                value={anotherProblem}
                onChange={text => setAnotherProblem(text)}
                placeholder="Nhập Lý do của bạn"
              />
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
      {/* Footer */}
      <LinearGradient
        style={styles.footerButtonSendContainer}
        colors={['#fe8c00', '#f83600']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}>
        <TouchableOpacity
          onPress={() => {
            AddReason();
            navigation.popToTop();
          }}
          style={styles.footerButtonSend}>
          <Text style={styles.footerButtonText}>Gửi Lý do</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#fff',
  },
  bodyTitleContainer: {
    alignItems: 'center',
    marginTop: height / 30,
  },
  bodyTitleText: {
    fontSize: 21,
  },
  // body
  bodyContainer: {
    height: height / 1.3,
  },
  // Reason
  bodyReasonContainer: {
    marginLeft: width / 20,
    width: '90%',
  },
  bodyCheckBoxMiniContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bodyCheckBox: {
    marginBottom: 10,
    marginRight: 5,
  },
  bodyCheckBoxIcon: {
    borderColor: 'red',
  },
  bodyCheckBoxContent: {
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: -5,
    width: width / 1.1,
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#f7f7f7',
    minHeight: height / 8,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  bodyReasonText: {
    fontSize: 16,
    width: '90%',
  },
  // Footer
  footerButtonSendContainer: {
    marginHorizontal: 20,
    borderRadius: 8,
    height: height / 15,
    marginTop: height / 40,
  },
  footerButtonSend: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 21,
  },
});

export default CancelComponent;
