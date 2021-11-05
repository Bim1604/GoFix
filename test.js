// /* eslint-disable prettier/prettier */
// import React from 'react';
// import {Dimensions, StyleSheet, View} from 'react-native';
// import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import {useState} from 'react';
// import Geolocation from 'react-native-geolocation-service';

// const center =
//   (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122;

// const styles = StyleSheet.create({
//   container: {
//     height: 400,
//     width: 400,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: {
//     width: 200,
//     height: 200,
//   },
// });
// const Test = () => {
//   const [latitude, setLatitude] = useState(1);
//   const [longtitude, setLongtitude] = useState(1);

//   Geolocation.getCurrentPosition(
//     position => {
//       console.log(position.coords.latitude);
//       console.log(position.coords.longitude);
//     },
//     error => {
//       // See error code charts below.
//       console.log(error.code, error.message);
//     },
//     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//   );

//   return (
//     <View style={styles.container}>
//       {/* <Button title="GetAddress" onPress={getAddress()} /> */}
//       <MapView
//         style={styles.map}
//         onPress={event => {
//           // console.log(event.nativeEvent);
//         }}
//         region={{
//           latitude: latitude,
//           longitude: longtitude,
//           latitudeDelta: 0.015,
//           longitudeDelta: center,
//         }}
//       />
//     </View>
//   );
// };

// export default Test;
/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import messaging, {
  firebase,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {Button} from 'react-native';

const Test = () => {
  const [notification, setNotification] = useState({
    title: undefined,
    body: undefined,
    image: undefined,
  });
  const getToken = async () => {
    const token = await messaging().getToken();
    messaging().onMessageSent(messageId => {
      console.log('Message has been sent to the FCM server', messageId);
    });
    console.log('.............: ', token);
  };

  useEffect(() => {
    getToken();
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        JSON.stringify(remoteMessage),
      );
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
          setNotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            image: remoteMessage.notification.android.imageUrl,
          });
        }
      });
  }, []);

  return (
    <View>
      <Text>ho</Text>
      <Text>{`title: ${notification?.title}`}</Text>
      <Text>{`title: ${notification?.body}`}</Text>
      <Image source={{uri: notification.image}} width={300} height={300} />
    </View>
  );
};

export default Test;
