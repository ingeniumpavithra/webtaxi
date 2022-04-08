import React,{useState, useContext} from 'react'
import { View, Text ,Picker, ScrollView} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Input from '../components/input'
import Button from '../components/button'
import { LocalContext } from "../context/LocalContextProvider";
import {HeaderIconButton} from '../components/HeaderIconButton';

export default function LocalTrip() { ({navigation}) 
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
  
 
const isValidForm = () => {
  if (!isValidObjField(localData.name, localData.phone,localData.xtrakm))
  return updateError('Required all fields !', setError);
    if (!localData.name.trim() || localData.name.length < 3)
    return updateError('Invalid username !', setError);
  if (!localData.phone.trim() || localData.phone.length != 10  )
    return updateError('Phone number invalid !', setError);
  return true

}

const isValidObjField = (name, phone) => {

  return name.trim() && phone.trim()
}
const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater('');
  }, 2600);
}


const {
  localData,
  handleChangeBilling
} = useContext(LocalContext);
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
        Local Trip
      </Text>
      {error ? <Text style={{ color: "red", paddingBottom: 12, fontSize: 18 }} >{error}</Text> : null}
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='user'
          placeholder='Customer Name'
          autoCapitalize='none'
          autoCompleteType='username'
          keyboardType='default'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
         
          value = {localData.name}
          onChangeText={value => handleChangeBilling(value,'name')}
         
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='phone'
          placeholder='Phone number'
          autoCapitalize='none'
          autoCompleteType='username'
          keyboardType='numeric'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {localData.phone}
          onChangeText={value => handleChangeBilling(value,'phone')}
        />
      </View>
      <View style={{ paddingHorizontal: 32,paddingVertical:0, marginBottom: 16,   width: '85%',borderWidth: 0.3,borderRadius:8}}>

     <Picker
    selectedValue = {localData.triphr}
    onValueChange={value => handleChangeBilling(value,'triphr')}
   >
         <Picker.Item label="Trip Hour" value="0" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
      </Picker>
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='gauge'
          placeholder='Kms Allowed'
          autoCapitalize='none'
          autoCompleteType='username'
          keyboardType='numeric'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          disabled
          value = {localData.tripkms}
           onChangeText={value => handleChangeBilling(value,'tripkms')}
        />
      </View>

      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input

          icon='arrow-with-circle-up'
          placeholder='Extra Kms'
          autoCapitalize='none'
          autoCompleteType='username'
          keyboardType='default'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          value = {localData.xtrakm}
           onChangeText={value => handleChangeBilling(value,'xtrakm')} 
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
          value = {localData.tolls}
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
          value = {localData.extra}
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
          value = {localData.extra_amt}
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
          value = {localData.discount}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeBilling(value,'discount')}
        />
      </View>
     
      <Button  label='Next'
       onPress={() => { if(isValidForm()){
        navigation.navigate("Billlocaltrip")
       }
        }}
      />
     
    </View>
    </ScrollView>
  )
}
