/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Image,
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
  faFrownOpen,
  faGrinSquintTears,
  faLaughBeam,
  faSadCry,
  faSmile,
  faTimes,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import ava from '../../assets/image/mechanic.jpg';
import {height} from '../../assets/base';

const apiRequest =
  'https://history-search-map.herokuapp.com/api/requestCustomer';

const EvaluateComponent = ({navigation, route}) => {
  const [description, setDescription] = useState('');
  const [star, setStar] = useState();
  const [isStar, setIsStar] = useState(false);
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
  }

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
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#fe8c00', '#f83600']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
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
          <Image source={ava} style={styles.bodyImage} />
        </View>
        <View style={styles.bodyTextContainer}>
          <Text style={styles.bodyTextTitle}>
            Bạn cảm thấy dịch vụ như thế nào
          </Text>
          <Text style={styles.bodyText}>Hãy giúp chúng tôi cải thiện trải</Text>
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
            {route.params.totalCost}.000 Đ
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
              navigation.popToTop();
            }}>
            <Text style={styles.bodyFooterButtonText}>Gửi</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
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
    height: height / 12,
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
    height: '72%',
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
  bodyStarContainer: {
    flexDirection: 'row',
    width: 300,
    height: 50,
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
    width: 380,
    minHeight: 100,
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
    paddingTop: 20,
    backgroundColor: '#fff',
    borderTopColor: '#D3D3D3',
    height: 80,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyFooterText: {
    color: '#000',
    fontSize: 18,
  },
  footerLinearGradient: {
    borderRadius: 15,
    marginTop: 15,
  },
  bodyFooterButton: {
    width: 380,
    height: 50,
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