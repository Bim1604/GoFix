// /* eslint-disable prettier/prettier */
// import React, {useEffect} from 'react';
// import {Dimensions, StyleSheet, View} from 'react-native';
// import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import {useState} from 'react';
// import GetLocation from 'react-native-get-location';

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

//   var NY = {
//     lat: 40.7809261,
//     lng: -73.9637594,
//   };

//   Geocoder.geocodePosition(NY);

//   useEffect(() => {
//     getLocal();
//     return () => {
//       getLocal();
//     };
//   }, []);

//   const getLocal = () => {
//     GetLocation.getCurrentPosition({
//       enableHighAccuracy: true,
//       timeout: 15000,
//     })
//       .then(location => {
//         setLatitude(location.latitude);
//         setLongtitude(location.longitude);
//       })
//       .catch(error => {});
//   };

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
