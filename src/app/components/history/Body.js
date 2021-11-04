/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarAlt,
  faChevronRight,
  faDollarSign,
  faMapMarkerAlt,
  faMotorcycle,
  faUser,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import {width, height} from '../../assets/base';

export const ItemListDetails = ({text, icon}) => {
  return (
    <View style={styles.itemContentContainer}>
      <FontAwesomeIcon
        style={styles.itemContentIcon}
        icon={icon}
        size={icon === faMotorcycle ? 23 : 19}
        color="#fe8c00"
      />
      <Text>{text}</Text>
    </View>
  );
};

const completeStatusText = 'Đã hoàn thành';
const cancelStatusText = 'Đã hủy đơn';

const HistoryItem = ({
  name,
  phone,
  address,
  detailsFix,
  time,
  price,
  avatar,
  status,
  navigation,
  motor,
  car,
  description,
  image,
  reasonCancel,
}) => {
  const InfoOrder = [
    {
      icon: faUser,
      content: name,
    },
    {
      icon: faMapMarkerAlt,
      content: address,
    },
  ];
  return (
    <View>
      {/* Image */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HistoryDetailsComponent', {
            name: name,
            time: time,
            address: address,
            detailsFix: detailsFix,
            price: price,
            status: status,
            avatar: avatar,
            phone: phone,
            motor: motor,
            car: car,
            description: description,
            image: image,
            reasonCancel: reasonCancel,
          });
        }}
        style={styles.itemContainer}>
        <View style={styles.itemTimeContainer}>
          <ItemListDetails icon={faCalendarAlt} text={time} />
        </View>
        {/* item */}
        <View style={styles.itemTitleContentContainer}>
          {/* Ava */}
          <View style={styles.itemImageContainer}>
            <Image source={{uri: avatar}} style={styles.itemImageItem} />
          </View>
          {/* Info */}
          <View style={styles.itemsContentContainer}>
            {InfoOrder.map((item, index) => (
              <ItemListDetails
                icon={item.icon}
                text={item.content}
                key={index}
              />
            ))}
          </View>
          <View style={styles.itemRouteContainer}>
            <FontAwesomeIcon
              style={styles.itemContentIcon}
              icon={faChevronRight}
              size={23}
              color="#696969"
            />
          </View>
        </View>
        <View>
          <View style={styles.itemDetailsFixContainer}>
            <ItemListDetails icon={faWrench} text={detailsFix[0].text} />
            <ItemListDetails icon={faDollarSign} text={price} />
          </View>
          <View>
            <Text
              style={status ? styles.itemCompleteText : styles.itemCancelText}>
              {status ? completeStatusText : cancelStatusText}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const apiHistoryCus =
  'https://history-search-map.herokuapp.com/api/historyCustomer';
const BodyComponent = ({navigation, id}) => {
  const [data, setData] = useState();

  const getHistoryCus = async () => {
    await fetch(apiHistoryCus)
      .then(res => res.json())
      .then(json => {
        let historyItem = [];
        for (let index = 0; index < json.length; index++) {
          if (id === json[index].cusID) {
            historyItem.push(json[index]);
          }
        }
        setData(historyItem);
      });
  };

  useEffect(() => {
    getHistoryCus();
  });
  const renderItem = ({item, index}) => {
    return (
      <View>
        <HistoryItem
          name={item.name}
          phone={item.phone}
          time={item.time}
          address={item.address}
          detailsFix={item.detailsFix}
          price={item.price}
          avatar={item.avatar}
          status={item.status}
          navigation={navigation}
          car={item.car}
          motor={item.motor}
          description={item.description}
          image={item.image}
          reasonCancel={item.reasonCancel}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.listItemContainer}>
        <FlatList data={data} renderItem={renderItem} horizontal={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  // list container
  listItemContainer: {
    height: height - height / 6,
  },
  // Item container
  itemContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: height / 80,
  },
  itemTimeContainer: {
    marginLeft: width / 60,
  },
  itemTitleContentContainer: {
    flexDirection: 'row',
  },
  // image item container
  itemImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: width / 60,
    paddingRight: width / 60,
    width: '27%',
  },
  itemImageItem: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: height / 80,
    marginTop: height / 80,
  },
  // Details fix
  itemDetailsFixContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#A9A9A9',
    borderBottomColor: '#A9A9A9',
    borderBottomWidth: 1,
    paddingBottom: height / 100,
    paddingLeft: width / 30,
    paddingRight: width / 10,
    paddingTop: height / 100,
    marginTop: height / 180,
    marginBottom: height / 180,
  },
  itemCompleteText: {
    color: '#33CC00',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: height / 100,
    marginBottom: height / 100,
    marginLeft: width / 20,
  },
  itemCancelText: {
    color: '#FF3300',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: height / 100,
    marginBottom: height / 100,
    marginLeft: width / 20,
  },
  itemsContentContainer: {
    width: '60%',
  },
  // Image
  itemContentContainer: {
    flexDirection: 'row',
    marginTop: height / 80,
    width: '87%',
  },
  itemContentIcon: {
    marginRight: width / 70,
  },
  // Image route
  itemRouteContainer: {
    width: '13%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BodyComponent;
