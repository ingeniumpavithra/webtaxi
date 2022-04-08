import React,{useState, useContext} from 'react'

import { View ,Text ,ScrollView} from 'react-native'

import { useNavigation } from "@react-navigation/native";
import Input from '../components/input'
import Button from '../components/button'
import {HeaderIconButton} from '../components/HeaderIconButton';
import { BillingContext } from "../context/BillingContextProvider";

export default function onedaytrip() { ({navigation}) 
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
    billingData,
    handleChangeBilling
  } = useContext(BillingContext);

  const isValidForm = () => {
    // 
    if (!isValidObjField(billingData.customer_name,billingData.phone_number, billingData.distance_travelled))
      return updateError('Required all fields !', setError);
   
    if (!billingData.customer_name.trim() || billingData.customer_name.length < 3)
      return updateError('Invalid username !', setError);
    if (!billingData.phone_number.trim() || billingData.phone_number.length != 10 )
      return updateError('Phone number invalid !', setError);
   
    if (!billingData.distance_travelled.trim())
      return updateError('Distance travel required !', setError);
   
    if (billingData.discount < 0 )
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
            ONE DAY TRIP
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
          value = {billingData.customer_name}
          onChangeText={value => handleChangeBilling(value,'customer_name')}
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
          value = {billingData.phone_number}
          onChangeText={value => handleChangeBilling(value,'phone_number')}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='briefcase'
          placeholder='Initital Payment'
          autoCapitalize='none'
          keyboardType='default'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          editable={false}
          selectTextOnFocus={false}
          value = {billingData.initial_payment}
          onChangeText={value => handleChangeBilling(value,'initial_payment')}
        />
     </View>
       <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='gauge'
          placeholder='KM Travelled'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {billingData.distance_travelled}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeBilling(value,'distance_travelled')}
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
          value = {billingData.tolls}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeBilling(value,'tolls')}
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
          value = {billingData.extra}
          keyboardType = 'default'
          onChangeText={value => handleChangeBilling(value,'extra')}
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
          value = {billingData.extra_amt}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeBilling(value,'extra_amt')}
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
          value = {billingData.discount}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeBilling(value,'discount')}
        />
      </View>
     
      <Button  label='Next'
       onPress={() =>  { if(isValidForm()){
        navigation.navigate("Billonedaytrip")
}
}} 

        />
     
        </View>
        </ScrollView>
    )
}
