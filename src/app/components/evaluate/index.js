/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCommentDots,
  faTimes,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import {height, width} from '../../assets/base';

const apiRequest =
  'https://history-search-map.herokuapp.com/api/requestCustomer';
const apiHistoryCus =
  'https://history-search-map.herokuapp.com/api/historyCustomer';
const EvaluateComponent = ({navigation, route}) => {
  const [description, setDescription] = useState('');
  const [star, setStar] = useState();
  const [isStar, setIsStar] = useState(false);
  const [time, setTime] = useState('');
  const RateStarComponent = starValue => {
    switch (starValue) {
      case 1: {
        setStar(1);
        break;
      }
      case 2: {
        setStar(2);
        break;
      }
      case 3: {
        setStar(3);
        break;
      }
      case 4: {
        setStar(4);
        break;
      }
      case 5: {
        setStar(5);
        break;
      }
    }
  };
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

  const PostAPIHistoryCus = () => {
    fetch(apiHistoryCus, {
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
        status: true,
        motor: route.params.cate !== 'Xe máy' ? '' : route.params.vehicleName,
        car: route.params.cate === 'Xe máy' ? '' : route.params.vehicleName,
        description: description,
        reasonCancel: '',
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

  const PostAPIRequest = () => {
    fetch(apiRequest, {
      method: 'POST',
      body: JSON.stringify({
        description: description,
        star: star,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const EvaluateStarComponent = starValue => {
    if (isStar === false) {
      setIsStar(true);
      RateStarComponent(starValue);
    }
    if (isStar === true) {
      if (star === starValue) {
        setIsStar(false);
      } else {
        RateStarComponent(starValue);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={['#fe8c00', '#f83600']}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                PostAPIHistoryCus();
                navigation.popToTop();
              }}>
              <FontAwesomeIcon
                style={styles.headerIconBack}
                icon={faTimes}
                size={30}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>ĐÁNH GIÁ DỊCH VỤ</Text>
            {/* Icon */}
            <TouchableOpacity>
              <FontAwesomeIcon
                style={styles.headerIconMessage}
                icon={faCommentDots}
                size={26}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {/* Body */}
        <View style={styles.bodyContainer}>
          {/* Image */}
          <View style={styles.bodyImageContainer}>
            <Image
              source={{uri: route.params.avatar}}
              style={styles.bodyImage}
            />
          </View>
          <View style={styles.bodyTextContainer}>
            <Text style={styles.bodyTextTitle}>
              Bạn cảm thấy dịch vụ như thế nào
            </Text>
            <Text style={styles.bodyText}>
              Hãy giúp chúng tôi cải thiện trải
            </Text>
            <Text style={styles.bodyText}>
              nghiệm với GoFix bằng cách đánh giá
            </Text>
            <Text style={styles.bodyText}>cuốc xe này.</Text>
            {/* Star rate */}
            <View style={styles.bodyStarContainer}>
              <TouchableOpacity onPress={() => EvaluateStarComponent(1)}>
                <FontAwesomeIcon
                  style={
                    isStar === true && star >= 1
                      ? styles.bodyStarIconReady
                      : styles.bodyStarIcon
                  }
                  icon={faStar}
                  size={35}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => EvaluateStarComponent(2)}>
                <FontAwesomeIcon
                  style={
                    isStar === true && star >= 2
                      ? styles.bodyStarIconReady
                      : styles.bodyStarIcon
                  }
                  icon={faStar}
                  size={35}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => EvaluateStarComponent(3)}>
                <FontAwesomeIcon
                  style={
                    isStar === true && star >= 3
                      ? styles.bodyStarIconReady
                      : styles.bodyStarIcon
                  }
                  icon={faStar}
                  size={35}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => EvaluateStarComponent(4)}>
                <FontAwesomeIcon
                  style={
                    isStar === true && star >= 4
                      ? styles.bodyStarIconReady
                      : styles.bodyStarIcon
                  }
                  icon={faStar}
                  size={35}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => EvaluateStarComponent(5)}>
                <FontAwesomeIcon
                  style={
                    isStar === true && star === 5
                      ? styles.bodyStarIconReady
                      : styles.bodyStarIcon
                  }
                  icon={faStar}
                  size={35}
                />
              </TouchableOpacity>
            </View>
            <LinearGradient
              colors={['#fe8c00', '#f83600']}
              start={{x: 0.0, y: 1.0}}
              end={{x: 1.0, y: 1.0}}
              style={styles.footerLinearGradient}>
              <View style={styles.bodyRateContainer}>
                <TextInput
                  style={styles.bodyRateTextInput}
                  placeholder="Đánh giá của bạn"
                  multiline={true}
                  onChangeText={text => setDescription(text)}
                  value={description}
                />
              </View>
            </LinearGradient>
          </View>
        </View>
        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={styles.footerFeeContainer}>
            <Text style={styles.bodyFooterText}>Tổng chi phí sửa chửa</Text>
            <Text style={styles.bodyFooterText}>
              {route.params.price}.000 Đ
            </Text>
          </View>
          <LinearGradient
            colors={['#fe8c00', '#f83600']}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 1.0}}
            style={styles.footerLinearGradient}>
            <TouchableOpacity
              style={styles.bodyFooterButton}
              onPress={() => {
                PostAPIRequest();
                PostAPIHistoryCus();
                navigation.popToTop();
              }}>
              <Text style={styles.bodyFooterButtonText}>Gửi</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // container
  container: {
    backgroundColor: '#fff',
  },
  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height / 9,
  },
  headerIconBack: {
    color: '#fff',
    margin: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    margin: 24,
  },
  headerIconMessage: {
    color: '#fff',
    margin: 20,
  },
  // body
  bodyContainer: {
    height: height / 1.7,
  },
  bodyImageContainer: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyImage: {
    width: 130,
    height: 130,
    borderRadius: 60,
  },
  bodyTextContainer: {
    alignItems: 'center',
  },
  bodyTextTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    color: '#808080',
  },
  // Star
  bodyStarContainer: {
    flexDirection: 'row',
    width: width / 1.25,
    height: height / 20,
    marginTop: 20,
  },
  bodyStarIcon: {
    marginRight: 30,
    color: '#DCDCDC',
  },
  bodyStarIconReady: {
    marginRight: 30,
    color: '#fe8c00',
  },
  bodyRateContainer: {
    width: width / 1.15,
    height: height / 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 15,
    margin: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingTop: 5,
  },
  bodyRateTextInput: {
    width: '100%',
    textAlignVertical: 'top',
  },
  // footer
  footerContainer: {
    alignItems: 'center',
  },
  footerFeeContainer: {
    borderTopWidth: 1,
    marginTop: height / 20,
    paddingTop: 20,
    backgroundColor: '#fff',
    borderTopColor: '#D3D3D3',
    height: height / 10,
    width: width / 1.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyFooterText: {
    color: '#000',
    fontSize: 16,
  },
  footerLinearGradient: {
    borderRadius: 15,
    marginTop: height / 40,
  },
  bodyFooterButton: {
    width: width / 1.15,
    height: height / 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyFooterButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});
export default EvaluateComponent;
