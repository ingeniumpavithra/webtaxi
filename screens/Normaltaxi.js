import React,{useState, useContext} from 'react'
import { View, Text, Picker, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { NormalContext } from "../context/NormalContextProvider";
import {HeaderIconButton} from '../components/HeaderIconButton';
import Input from '../components/input'
import Button from '../components/button'

export default function NormalTrip() {({navigation}) 
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
  const [error, setError] = useState('');
  
  const navigation = useNavigation();
  const isValidForm = () => {
    if (!isValidObjField(normalData.from, normalData.to, normalData.customer_name, normalData.phone, normalData.distance_travelled ))
      return updateError('Required all fields !', setError);
    if (!normalData.from.trim() || normalData.from.length < 4)
      return updateError('Invalid start place !', setError);
    if (!normalData.to.trim() || normalData.to.length < 4)
      return updateError('Invalid end place !', setError);
    if (!normalData.customer_name.trim() || normalData.customer_name.length < 4)
      return updateError('Invalid username !', setError);
    if (!normalData.phone.trim() || normalData.phone.length != 10)
      return updateError('Phone number invalid!', setError);
    if (!normalData.distance_travelled.trim())
      return updateError('km required !', setError);
    return true

  }

  const isValidObjField = (start, end, name, phone, km, ) => {

    return start.trim() && end.trim() && name.trim() && phone.trim() && km.trim() 
  }

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('');
    }, 2600);
  }


  const {
    normalData,
    handleChangeBilling
  } = useContext(NormalContext);
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
        NORMAL TAXI
      </Text>
      {error ? <Text style={{ color: "red", paddingBottom: 12, fontSize: 18 }} >{error}</Text> : null}
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='arrow-left'
          placeholder='From'
          autoCapitalize='none'
          keyboardType='default'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {normalData.from}
          onChangeText={value => handleChangeBilling(value,'from')}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='arrow-right'
          placeholder='To'
          autoCapitalize='none'
          keyboardType='default'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {normalData.to}
          onChangeText={value => handleChangeBilling(value,'to')}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='user'
          placeholder='Customer Name'
          autoCapitalize='none'
          keyboardType='default'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {normalData.customer_name}
          onChangeText={value => handleChangeBilling(value,'customer_name')}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='phone'
          placeholder='phone number'
          autoCapitalize='none'
          keyboardType={'numeric'}
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {normalData.phone}
          onChangeText={value => handleChangeBilling(value,'phone')}

        />

      </View>

      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input

          icon='gauge'
          placeholder='Distance Travelled'
          autoCapitalize='none'
          keyboardType={'numeric'}
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {normalData.distance_travelled}
          onChangeText={value => handleChangeBilling(value,'distance_travelled')}

        />
      </View>
      <View style={{ paddingHorizontal: 32, paddingVertical: 0, marginBottom: 16, width: '85%', borderWidth: 0.3, borderRadius: 8 }}>

                <Picker
                   value = {normalData.waiting_hour}
                   onValueChange={value => handleChangeBilling(value,'waiting_hour')}

                >
                    <Picker.Item label="waiting_hour" value = "0" />
                    <Picker.Item label="1" value =  "1"/>
                    <Picker.Item label="2" value =  "2"/>
                    <Picker.Item label="3" value =  "3"/>
                    <Picker.Item label="4" value =  "4"/>
                    <Picker.Item label="5" value =  "5"/>
                </Picker>
            </View>

            <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='signal'
          placeholder='Toll/Parking'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {normalData.tolls}
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
          value = {normalData.extra}
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
          value = {normalData.extra_amt}
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
          value = {normalData.discount}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeBilling(value,'discount')}
        />
      </View>
      
      <Button label='Next'      
       onPress={() => {
        if(isValidForm()){
          navigation.navigate("Billnormaltrip")
        }
      }  
       
     }/>
  
    </View>
    </ScrollView>
  )
}
