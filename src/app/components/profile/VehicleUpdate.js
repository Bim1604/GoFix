/* eslint-disable prettier/prettier */
import {faChevronLeft, faStarOfLife} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {height, width} from '../../assets/base';
import {Picker} from '@react-native-picker/picker';

const VehicleUpdateComponent = ({navigation, route}) => {
  const [cate, setCate] = useState(route.params.cate);
  const [name, setName] = useState(route.params.name);
  const [number, setNumber] = useState(route.params.number);
  const [color, setColor] = useState(route.params.color);
  const UpdateAPIVehicle = async () => {
    await fetch(
      `https://history-search-map.herokuapp.com/api/vehicle/${route.params.id}`,
      {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          cate: cate,
          name: name,
          number: number,
          color: color,
          userID: route.params.userID,
        }),
      },
    )
      .then(response => {
        return response.json();
      })
  
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.headerText}>Sửa thông tin xe</Text>
        </View>
      </LinearGradient>
      {/* Body */}
      <View style={styles.bodyContainer}>
        {/* cate */}
        <View style={styles.bodyItemsContainer}>
          <View style={styles.bodyItemsTitleContainer}>
            <Text style={styles.bodyItemsTitleText}>Loại Phương tiện</Text>
            <FontAwesomeIcon
              style={styles.bodyItemsTitleIcon}
              icon={faStarOfLife}
              size={10}
            />
          </View>
          <View style={styles.bodyItemsCatePicker}>
            <Picker
              selectedValue={cate}
              style={styles.bodyItemsCatePickerText}
              onValueChange={(itemValue, itemIndex) => setCate(itemValue)}>
              <Picker.Item label="Xe máy" value="Xe máy" />
              <Picker.Item label="Ô tô" value="Ô tô" />
            </Picker>
          </View>
        </View>
        {/* name */}
        <View style={styles.bodyItemsContainer}>
          <View style={styles.bodyItemsTitleContainer}>
            <Text style={styles.bodyItemsTitleText}>Tên Phương tiện</Text>
            <FontAwesomeIcon
              style={styles.bodyItemsTitleIcon}
              icon={faStarOfLife}
              size={10}
            />
          </View>
          <TextInput
            onChangeText={setName}
            value={name}
            onChange={text => setName(text)}
            style={styles.bodyItemsTitleTextInput}
          />
        </View>
        {/* Number */}
        <View style={styles.bodyItemsContainer}>
          <View style={styles.bodyItemsTitleContainer}>
            <Text style={styles.bodyItemsTitleText}>Biển số xe</Text>
            <FontAwesomeIcon
              style={styles.bodyItemsTitleIcon}
              icon={faStarOfLife}
              size={10}
            />
          </View>
          <TextInput
            onChangeText={setNumber}
            value={number}
            onChange={text => setNumber(text)}
            style={styles.bodyItemsTitleTextInput}
          />
        </View>
        {/* Color */}
        <View style={styles.bodyItemsContainer}>
          <View style={styles.bodyItemsTitleContainer}>
            <Text style={styles.bodyItemsTitleText}>Màu xe</Text>
            <FontAwesomeIcon
              style={styles.bodyItemsTitleIcon}
              icon={faStarOfLife}
              size={10}
            />
          </View>
          <TextInput
            onChangeText={setColor}
            value={color}
            onChange={text => setColor(text)}
            style={styles.bodyItemsTitleTextInput}
          />
        </View>
      </View>
      {/*  Button update  */}
      <TouchableOpacity
        onPress={() => {
          UpdateAPIVehicle();
          navigation.navigate('VehicleDetailsComponent', {
            id: route.params.userID,
            result: 1,
          });
        }}
        style={styles.bodyInfoUpdateContainer}>
        <Text style={styles.bodyInfoUpdateText}>Lưu thông tin xe</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: height,
  },
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
    marginLeft: width / 4,
  },
  //   Body
  bodyContainer: {
    paddingTop: height / 80,
    height: height / 1.25,
  },
  //   item
  bodyItemsContainer: {
    marginTop: height / 80,
    marginBottom: height / 80,
  },
  bodyItemsTitleContainer: {
    flexDirection: 'row',
    marginLeft: width / 30,
  },
  bodyItemsTitleText: {
    fontSize: 16,
    fontWeight: '700',
  },
  bodyItemsTitleIcon: {
    color: '#FF9311',
    marginLeft: width / 80,
  },
  //   Picker
  bodyItemsCatePicker: {
    backgroundColor: '#f7f7f7',
    marginHorizontal: width / 30,
    marginTop: height / 80,
    borderRadius: 10,
    height: height / 17,
    justifyContent: 'center',
  },
  bodyItemsCatePickerText: {
    color: '#696969',
  },
  //   TextInput
  bodyItemsTitleTextInput: {
    backgroundColor: '#f7f7f7',
    marginHorizontal: width / 30,
    marginTop: height / 80,
    borderRadius: 10,
    height: height / 17,
    justifyContent: 'center',
    paddingLeft: width / 40,
    color: '#696969',
  },
  //   Button update
  bodyInfoUpdateContainer: {
    marginHorizontal: width / 30,
    borderWidth: 1,
    borderColor: '#fb5f01',
    backgroundColor: '#fb5f01',
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 15,
    borderRadius: 10,
  },
  bodyInfoUpdateText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default VehicleUpdateComponent;
