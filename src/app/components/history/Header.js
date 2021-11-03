/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {width, height} from '../../assets/base';

const HeaderComponent = ({content}) => {
  return (
    <LinearGradient
      colors={['#fe8c00', '#f83600']}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}>
      <View>
        <View style={stylesHeader.headerContainer}>
          <Text style={stylesHeader.headerText}>{content}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const stylesHeader = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fa',
  },
  headerContainer: {
    flexDirection: 'row',
    height: height / 12,
    justifyContent: 'center',
  },
  headerIcon: {
    alignSelf: 'center',
    marginLeft: width / 80,
  },
  iconBack: {
    alignSelf: 'center',
    marginLeft: width / 22,
  },
  headerText: {
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});

export default HeaderComponent;
