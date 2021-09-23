/* eslint-disable prettier/prettier */
import {faArrowLeft, faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {stylesHeader} from '../../styles/fixInfo';
const width = Dimensions.get('window').width;
const ImagePicker = ({navigation}) => {
  const [photo, setPhoto] = useState();
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  return (
    <View style={styles.container}>
      {/* header */}
      <LinearGradient
        colors={['#fe8c00', '#f83600']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}>
        <View>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}>
              <FontAwesomeIcon
                style={stylesHeader.default.headerText}
                icon={faArrowLeft}
                size={30}
              />
            </TouchableOpacity>
            {/* Icon */}
            <TouchableOpacity>
              <FontAwesomeIcon
                style={stylesHeader.default.headerIconMessage}
                icon={faCommentDots}
                size={26}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          onPress={async () => {
            await launchCamera(
              {
                mediaType: 'photo',
                quality: 1,
                includeBase64: true,
                saveToPhotos: true,
              },
              res => {
                setPhoto(res.assets);
              },
            );
          }}>
          <Text>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await launchCamera(
              {
                mediaType: 'video',
                videoQuality: 'high',
                saveToPhotos: true,
                durationLimit: 15,
              },
              res => {
              },
            );
          }}>
          <Text>Video Record</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await launchImageLibrary(options, res => {
              if (res.assets) {
                setPhoto(res.assets);
                console.log('User assets picture');
              } else if (res.didCancel) {
                console.log('User cancel pick picture');
              } else if (res.errorCode) {
              }
            });
          }}>
          <Text>Choose Photo</Text>
        </TouchableOpacity>
      </View>
      <Image source={photo} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 200,
    height: 200,
  },
  bodyContainer: {
    marginTop: 100,
    borderWidth: 1,
    width: width,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 1,
    borderColor: '#A9A9A9',
    borderStyle: 'dotted',
    alignItems: 'center',
    marginBottom: 70,
  },
});
export default ImagePicker;
