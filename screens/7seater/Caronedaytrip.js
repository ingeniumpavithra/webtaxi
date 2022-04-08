import React,{useState, useContext} from 'react'

import { View ,Text ,ScrollView} from 'react-native'

import { useNavigation } from "@react-navigation/native";
import Input from '../../components/input'
import Button from '../../components/button'
import {HeaderIconButton} from '../../components/HeaderIconButton';
import { CaronedayContext } from "../../context/CaronedayContextProvider";

export default function Caronedaytrip() { ({navigation}) 
const [error, setError] = useState('');
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
       
          <HeaderIconButton
            name={'logout'}
            onPress={() => navigation.navigate("Login")}
           
            />
      
            
          
          
       
      ),
    });
  }, [navigation]);


  const {
    caronedayData,
    handleChangeCaroneday
  } = useContext(CaronedayContext);

  const isValidForm = () => {
    // 
    if (!isValidObjField(caronedayData.customer_name,caronedayData.phone_number, caronedayData.distance_travelled))
      return updateError('Required all fields !', setError);
   
    if (!caronedayData.customer_name.trim() || caronedayData.customer_name.length < 3)
      return updateError('Invalid username !', setError);
    if (!caronedayData.phone_number.trim() || caronedayData.phone_number.length != 10 )
      return updateError('Phone number invalid !', setError);
   
    if (!caronedayData.distance_travelled.trim())
      return updateError('Distance travel required !', setError);
   
    if (caronedayData.discount < 0 )
      return updateError('Enter valid Discount!', setError);
   
    return true

  }

  const isValidObjField = ( name, phone_number,km,) => {
    
    return  name.trim() && phone_number.trim() && km.trim()
  }

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('');
    }, 2600);
  }

  const navigation = useNavigation();
      return (
        <ScrollView
        style={{
           flex: 1,
           backgroundColor: '#fff',
         }}>
        <View
         style={{
            alignItems: 'center',
          }}>
            
            <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 10, paddingVertical: 25 }}>
            7 SEATER ONE DAY TRIP
      </Text>
      {error ? <Text style={{ color: "red", paddingBottom: 12, fontSize: 18 }} >{error}</Text> : null}
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='user'
          placeholder='Customer Name'
          autoCapitalize='none'
          keyboardType='default'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {caronedayData.customer_name}
          onChangeText={value => handleChangeCaroneday(value,'customer_name')}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='phone'
          placeholder='Phone number'
          autoCapitalize='none'
          keyboardType='numeric'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {caronedayData.phone_number}
          onChangeText={value => handleChangeCaroneday(value,'phone_number')}
        />
      </View>
     <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='attachment'
          placeholder='KM Rupees'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {caronedayData.kmrupees}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeCaroneday(value,'kmrupees')}
        />
      </View>
       <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='gauge'
          placeholder='Distance Travelled'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {caronedayData.distance_travelled}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeCaroneday(value,'distance_travelled')}
        />
      </View>
      
    
       <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='signal'
          placeholder='Toll/Parking'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {caronedayData.tolls}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeCaroneday(value,'tolls')}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='home'
          placeholder='Extra'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {caronedayData.extra}
          keyboardType = 'default'
          onChangeText={value => handleChangeCaroneday(value,'extra')}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='briefcase'
          placeholder='Extra Amount'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {caronedayData.extra_amt}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeCaroneday(value,'extra_amt')}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='shield'
          placeholder='Discount'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {caronedayData.discount}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeCaroneday(value,'discount')}
        />
      </View>
     
      <Button  label='Next'
       onPress={() =>  { if(isValidForm()){
        navigation.navigate("Billcaronedaytrip")
}
}} 

        />
     
        </View>
        </ScrollView>
    )
}
