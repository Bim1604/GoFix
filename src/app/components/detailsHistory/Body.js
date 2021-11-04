/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarAlt,
  faDollarSign,
  faImages,
  faMapMarkerAlt,
  faMotorcycle,
  faPhone,
  faUser,
  faWrench,
  faCar,
} from '@fortawesome/free-solid-svg-icons';
import {width, height} from '../../assets/base';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import {ItemListDetails} from '../history/Body';

const ImageBody = ({image}) => {
  return (
    <View>
      <Image
        style={styles.headerImageModal}
        resizeMode="stretch"
        source={{
          uri: image,
        }}
      />
    </View>
  );
};

const ImageFixer = ({
  image,
  setModalVisible,
  setIndexModalSwiper,
  indexCurrent,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
        setIndexModalSwiper(indexCurrent);
      }}>
      <Image
        style={styles.headerImage}
        source={{
          uri: image,
        }}
      />
    </TouchableOpacity>
  );
};

const ItemFixer = ({title}) => {
  return (
    <View>
      <View style={styles.itemContainer}>
        {/* <View> */}
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <View style={styles.itemTextInputContainer}>
          <Text style={styles.itemCurrencyText}> </Text>
        </View>
      </View>
    </View>
  );
};

const BodyDetails = ({
  name,
  time,
  address,
  detailsFix,
  price,
  status,
  avatar,
  phone,
  motor,
  car,
  description,
  reasonCancel,
  image,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [indexModalSwiper, setIndexModalSwiper] = useState(0);
  function ModalTester() {
    return (
      <View>
        <Modal
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Swiper
              index={indexModalSwiper}
              showsButtons={true}
              autoplay={false}
              activeDotStyle={styles.headerActiveDot}
              dotStyle={styles.headerDot}>
              {image.map((url, index) => (
                <ImageBody key={index} image={url.text} />
              ))}
            </Swiper>
          </View>
        </Modal>
      </View>
    );
  }
  const InfoOrder = [
    {
      icon: faUser,
      content: name,
    },
    {
      icon: faMapMarkerAlt,
      content: address,
    },
    {
      icon: motor !== '' ? faMotorcycle : faCar,
      content: motor !== '' ? motor : car,
    },
    {
      icon: faPhone,
      content: phone,
    },
  ];
  return (
    <ScrollView>
      <ModalTester />
      {/* Status */}
      <View
        style={
          status ? styles.statusCompleteContainer : styles.statusCancelContainer
        }>
        {status ? (
          <Text style={styles.statusText}>Đã hoàn thành sửa chữa</Text>
        ) : (
          <View>
            <Text style={styles.statusText}> Thợ đã hủy đơn</Text>
            <Text style={styles.statusReasonTitle}>
              Lý do:{' '}
              {<Text style={styles.statusReasonText}>{reasonCancel}</Text>}
            </Text>
          </View>
        )}
        <View style={styles.statusTextContainer}>
          <ItemListDetails icon={faCalendarAlt} text={time} />
        </View>
      </View>
      {/* User */}
      <View style={styles.userContainer}>
        <View style={styles.headerUserTitleContainer}>
          <FontAwesomeIcon
            icon={faUser}
            size={18}
            color="orange"
            style={styles.headerIconTitle}
          />
          <Text style={styles.headerUserTitle}>Thông tin Thợ</Text>
        </View>
        <View style={styles.headerUserContainer}>
          <View style={styles.itemImageContainer}>
            <Image source={{uri: avatar}} style={styles.itemImageItem} />
          </View>
          <View style={styles.headerDetailsContainer}>
            {InfoOrder.map((item, index) => (
              <ItemListDetails
                icon={item.icon}
                text={item.content}
                key={index}
              />
            ))}
          </View>
        </View>
      </View>
      {/* details fix */}
      <View style={styles.bodyItemContainer}>
        <View style={styles.bodyItemTitleContainer}>
          <FontAwesomeIcon
            style={styles.headerIconTitle}
            icon={faWrench}
            size={23}
            color="orange"
          />
          <Text style={styles.bodyItemTitle}>Chi tiết sửa chữa</Text>
        </View>
        {detailsFix.map((item, index) => (
          <ItemFixer title={item.text}  key={index} />
        ))}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 20,
            justifyContent: 'space-between',
            marginLeft: 8,
            marginRight: 10,
          }}>
          {description === '' ? <View /> : <Text>Mô tả chi tiết:</Text>}
          {description === '' ? <View /> : <Text>{description}</Text>}
        </View>
      </View>
      {/* Hình ảnh sửa chữa */}
      <View style={styles.bodyItemContainer}>
        <View style={styles.bodyItemTitleContainer}>
          <FontAwesomeIcon
            style={styles.headerIconTitle}
            icon={faImages}
            size={23}
            color="orange"
          />
          <Text style={styles.bodyItemTitle}>Hình ảnh sửa chữa</Text>
        </View>
        <View style={styles.headerImageFixer}>
          <ScrollView horizontal={true}>
            {image.map((item, index) => (
              <ImageFixer
                setIndexModalSwiper={setIndexModalSwiper}
                indexCurrent={index}
                setModalVisible={setModalVisible}
                key={index}
                image={item.text}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      {/* Tổng tiền */}
      <View style={styles.bodyItemFooterContainer}>
        <View style={styles.bodyItemTitleContainer}>
          <FontAwesomeIcon
            style={styles.headerIconTitle}
            icon={faDollarSign}
            size={23}
            color="orange"
          />
          <Text style={styles.bodyItemTitle}>Tổng chi phí sửa chữa</Text>
        </View>
        <View style={styles.bodyItemPriceContainer}>
          <Text style={styles.bodyItemPriceText}>Tổng chi phí</Text>
          <Text style={styles.bodyItemPriceText}>
            {price === undefined ? 0 : price} Đ
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Status
  statusCompleteContainer: {
    backgroundColor: '#00a74c',
    height: height / 9,
    paddingLeft: width / 40,
    paddingTop: height / 60,
    marginTop: height / 130,
  },
  statusCancelContainer: {
    backgroundColor: '#ff0000',
    height: height / 9,
    paddingLeft: width / 40,
    paddingTop: height / 150,
    marginTop: height / 130,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    // margin: width / 180,
  },
  statusReasonTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  statusReasonText: {
    color: '#fff',
    fontSize: 14,
  },
  statusTextContainer: {
    marginTop: height / 130,
    backgroundColor: '#fff',
    width: width / 2.5,
    justifyContent: 'center',
    paddingLeft: 3,
    paddingBottom: 3,
  },
  // User
  userContainer: {
    marginTop: height / 80,
    backgroundColor: '#FFFFFF',
    paddingBottom: height / 80,
  },
  // header user
  headerUserTitleContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#AAAA',
    paddingBottom: 10,
  },
  headerIconTitle: {
    marginRight: 5,
    marginLeft: width / 50,
  },
  headerUserTitle: {
    fontWeight: '700',
    fontSize: 20,
    alignSelf: 'flex-start',
    color: '#696969',
  },
  headerUserContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  headerUserImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: width / 20,
  },
  headerDetailsContainer: {
    width: '72%',
    marginRight: width / 8,
    marginTop: 5,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerIconUser: {
    marginRight: 5,
    marginBottom: 5,
    marginLeft: -3,
  },
  headerIconLocate: {
    marginRight: 5,
    marginTop: 5,
    marginLeft: -2,
    marginBottom: 5,
  },
  headerIconDirect: {
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  titleText: {
    alignSelf: 'center',
  },
  // modal
  modalContainer: {
    minHeight: height / 3.5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  // header modal
  modalHeaderContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  modalHeaderImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: width / 20,
  },
  modalHeaderDetailsContainer: {
    width: '50%',
    marginRight: width / 8,
    marginTop: 5,
  },
  modalHeaderTitle: {flexDirection: 'row'},
  modalHeaderIconUser: {
    marginRight: 10,
    marginBottom: 5,
    marginLeft: 3,
  },
  modalHeaderIconLocate: {
    marginRight: 8,
    marginTop: 5,
    marginBottom: 10,
  },
  modalTitleText: {
    alignSelf: 'center',
  },
  // Vehicle
  headerVehicleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -6,
  },
  headerIconVehicle: {
    marginRight: 5,
  },
  // item
  bodyItemContainer: {
    marginTop: height / 50,
    backgroundColor: '#fff',
  },
  bodyItemTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAA',
    paddingBottom: 10,
  },
  bodyItemTitle: {
    alignSelf: 'flex-start',
    color: '#696969',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '700',
  },
  // Price
  bodyItemFooterContainer: {
    marginTop: height / 50,
    backgroundColor: '#fff',
    height: height / 3,
  },
  bodyItemPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  bodyItemPriceText: {
    fontSize: 20,
  },
  // Item
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#AAAA',
  },
  itemTitleContainer: {
    width: '45%',
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemTextInputContainer: {
    flexDirection: 'row',
    height: height / 22,
    borderRadius: 6,
    borderColor: '#AAAAAA',
  },
  itemTextInput: {
    textAlignVertical: 'center',
  },
  itemCurrencyText: {
    alignSelf: 'center',
    marginRight: 10,
  },
  // Item image Swiper
  //Header swiper
  headerWrap: {
    height: 200,
    width: 370,
    marginLeft: 21,
    bottom: height / 5.8,
  },
  LinearGradientWrap: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    marginBottom: 15,
  },
  headerImageFixer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  headerImage: {
    flexDirection: 'row',
    height: height / 8,
    width: width / 2,
    borderRadius: 4,
    marginRight: 15,
  },
  headerImageModal: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    borderRadius: 4,
    marginRight: 15,
  },
  // Item image swiper dotStyle
  // Dot
  headerDot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 20,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  headerActiveDot: {
    backgroundColor: '#fe8c00',
    width: 20,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  // Image
  // image item container
  itemImageContainer: {
    padding: width / 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '27%',
  },
  itemImageItem: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: height / 200,
  },
  itemsContentContainer: {
    width: '60%',
    backgroundColor: '#000',
  },
});

export default BodyDetails;
