/* eslint-disable prettier/prettier */
import {faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {stylesHeader} from '../../styles/home/index';
const HeaderComponent = () => {
  return (
    <LinearGradient
      style={stylesHeader.default.LinearGradient}
      colors={['#fe8c00', '#f83600']}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}>
      <View style={stylesHeader.default.headerContainer}>
        <Text style={stylesHeader.default.headerText}>GoFix</Text>
        {/* Icon */}
        <TouchableOpacity>
          <FontAwesomeIcon
            style={stylesHeader.default.headerIconMessage}
            icon={faCommentDots}
            size={26}
          />
        </TouchableOpacity>
      </View>
      <Text style={stylesHeader.default.headerWelcome}>
        Chào mừng bạn đến với GoFix
      </Text>
    </LinearGradient>
  );
};

export default HeaderComponent;
