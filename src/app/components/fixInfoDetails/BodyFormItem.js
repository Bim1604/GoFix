/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {
  stylesBodyItem,
  stylesBodyBase,
} from '../../styles/fixInfoDetails/index';
import {dataLeft, dataRight} from '../../assets/data/bodyFixInfoItem';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const BodyFormItem = ({
  setReadyHetBinh,
  setReadyLopXe,
  setReadyTooHot,
  setReadyBeBanh,
  setReadyBugi,
  setReadyChetMay,
  setCheckDescription,
  setDescriptionDetails,
  checkDescription,
  descriptionDetails,
  setDescription,
  description,
  scrollRef,
}) => {
  return (
    <View>
      <View style={stylesBodyBase.default.bodyFormContainer}>
        <View style={stylesBodyItem.default.bodyCheckBoxContainer}>
          <View style={stylesBodyItem.default.bodyCheckBoxItemContainer}>
            <View style={stylesBodyItem.default.bodyCheckBoxLeftContainer}>
              {dataLeft.map((info, index) => (
                <View
                  key={index}
                  style={stylesBodyItem.default.bodyCheckBoxMiniContainer}>
                  <BouncyCheckbox
                    style={stylesBodyItem.default.bodyCheckBox}
                    size={22}
                    fillColor="#fb6100"
                    unfillColor="#FFFFFF"
                    disableText
                    iconStyle={stylesBodyItem.default.bodyCheckBoxIcon}
                    onPress={() => {
                      if (index === 0) {
                        setReadyHetBinh(prevState => !prevState);
                      }
                      if (index === 1) {
                        setReadyBeBanh(prevState => !prevState);
                      }
                      if (index === 2) {
                        setReadyChetMay(prevState => !prevState);
                      }
                      if (index === 3) {
                        setCheckDescription(prevState => !prevState);
                      }
                    }}
                  />
                  <Text> {info.text}</Text>
                </View>
              ))}
            </View>
            <View>
              {dataRight.map((info, index) => (
                <View
                  key={index}
                  style={stylesBodyItem.default.bodyCheckBoxMiniContainer}>
                  <BouncyCheckbox
                    style={stylesBodyItem.default.bodyCheckBox}
                    size={22}
                    fillColor="#fb6100"
                    unfillColor="#FFFFFF"
                    disableText
                    iconStyle={stylesBodyItem.default.bodyCheckBoxIcon}
                    onPress={() => {
                      if (index === 0) {
                        setReadyTooHot(prevState => !prevState);
                      }
                      if (index === 1) {
                        setReadyLopXe(prevState => !prevState);
                      }
                      if (index === 2) {
                        setReadyBugi(prevState => !prevState);
                      }
                    }}
                  />
                  <Text> {info.text}</Text>
                </View>
              ))}
            </View>
          </View>
          {checkDescription === true ? (
            <TextInput
              multiline={true}
              style={stylesBodyItem.default.bodyCheckBoxContent}
              onChangeText={setDescription}
              value={description}
              onChange={text => setDescription(text)}
              onPressIn={() => {
                scrollRef.current.scrollTo({
                  x: 355,
                  y: 355,
                  animated: true,
                });
              }}
              placeholder="Nhập vấn đề của bạn"
            />
          ) : (
            <View />
          )}
          <View style={{marginBottom: 10}}>
            <Text style={{color: '#A9A9A9'}}>Mô tả chi tiết</Text>
          </View>
          <TextInput
            multiline={true}
            style={stylesBodyItem.default.bodyCheckBoxContent}
            onChangeText={setDescriptionDetails}
            value={descriptionDetails}
            onChange={text => setDescriptionDetails(text)}
            onPressIn={() => {
              scrollRef.current.scrollTo({
                x: 355,
                y: 355,
                animated: true,
              });
            }}
            placeholder="Nhập để mô tả vấn đề của bạn"
          />
        </View>
      </View>
    </View>
  );
};

export default BodyFormItem;
