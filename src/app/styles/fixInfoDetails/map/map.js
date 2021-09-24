/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { width, height } from "../../../assets/base";

const stylesMap = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  // header
  headerMap: {
    flexDirection: 'row',
    bottom: 815,
    marginLeft: 11,
  },
  headerTextInputContainer: {
    borderWidth: 1,
    borderRadius: 15,
    width: '97%',
    height: 50,
    borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 23,
    marginRight: 23,
  },
  headerTouchContainer: {
    height: '100%',
    justifyContent: 'center',
    width: 25,
    marginLeft: 10,
  },
  headerIconBack: {
    color: '#778899',
  },
  TextInputContainer: {
    width: '88%',
  },
  headerTextInput: {
    width: '100%',
    fontSize: 18,
    color: '#000000',
    marginLeft: 10,
  },
});

export default stylesMap;
