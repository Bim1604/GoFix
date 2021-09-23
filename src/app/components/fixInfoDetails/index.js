/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderComponent from './Header';
import {useRef} from 'react';
import {stylesBodyBase} from '../../styles/fixInfoDetails/index';
import BodyBase from './BodyBase';
import ImageDescription from './ImageDescription';
import BottomView from './BottomView';
import BodyFormItem from './BodyFormItem';

const FixInfoDetailsComponent = ({navigation, route}) => {
  const [readyHetBinh, setReadyHetBinh] = useState(false);
  const [readyBeBanh, setReadyBeBanh] = useState(false);
  const [readyChetMay, setReadyChetMay] = useState(false);
  const [readyTooHot, setReadyTooHot] = useState(false);
  const [readyLopXe, setReadyLopXe] = useState(false);
  const [readyBugi, setReadyBugi] = useState(false);
  const [checkDescription, setCheckDescription] = useState(false);
  const [description, setDescription] = useState('');
  const scrollRef = useRef();
  return (
    <View style={stylesBodyBase.default.container}>
      <ScrollView ref={scrollRef}>
        <HeaderComponent navigation={navigation}/>
        <View style={stylesBodyBase.default.bodyContainer}>
          <BodyBase route={route} navigation={navigation}/>
          <BodyFormItem
            setCheckDescription={setCheckDescription}
            setDescription={setDescription}
            setReadyBeBanh={setReadyBeBanh}
            setReadyBugi={setReadyBugi}
            setReadyChetMay={setReadyChetMay}
            setReadyHetBinh={setReadyHetBinh}
            setReadyLopXe={setReadyLopXe}
            setReadyTooHot={setReadyTooHot}
            checkDescription={checkDescription}
            description={description}
            scrollRef={scrollRef}
          />
          <Text style={stylesBodyBase.default.bodyTitle}>Hình ảnh mô tả</Text>
          <ImageDescription navigation={navigation} />
        </View>
      </ScrollView>
      <BottomView
        description={description}
        readyBeBanh={readyBeBanh}
        readyBugi={readyBugi}
        readyChetMay={readyChetMay}
        readyHetBinh={readyHetBinh}
        readyLopXe={readyLopXe}
        readyTooHot={readyTooHot}
      />
    </View>
  );
};

export default FixInfoDetailsComponent;
