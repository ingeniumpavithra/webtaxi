import React,{ useState, useContext } from 'react'
import { View, Text, Picker,ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { HillsContext } from "../context/HillsContextProvider";
import {HeaderIconButton} from '../components/HeaderIconButton';
import Input from '../components/input'
import Button from '../components/button'

const Hillstrip = () => { ({navigation}) 
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
    const {
        billingDatas,
        handleChangeBilling
      } = useContext(HillsContext);

      const navigation = useNavigation();

    const isValidForm = () => {
        // 
        if (!isValidObjField( billingDatas.customer_name, billingDatas.phone_number, billingDatas.tripto,billingDatas.trip_days ))
          return updateError('Required all fields !', setError);
       
        if (!billingDatas.customer_name.trim() || billingDatas.customer_name.length < 4)
          return updateError('Invalid username !', setError);
        if (!billingDatas.phone_number.trim() || billingDatas.phone_number.length != 10)
          return updateError('Phone number invalid !', setError);
       
        if (!billingDatas.tripto)
          return updateError('Select trip to !', setError);
       
        if (!billingDatas.trip_days )
          return updateError('Enter Trip days!', setError);
       
        return true
    
      }
    
      const isValidObjField = ( name, phone_number) => {
    
        return  name.trim() && phone_number.trim
      }
    
      const updateError = (error, stateUpdater) => {
        stateUpdater(error);
        setTimeout(() => {
          stateUpdater('');
        }, 2600);
      }

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
                Hills Trip
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
                    value = {billingDatas.customer_name}
                    onChangeText={value => handleChangeBilling(value,'customer_name')}

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
                    onChangeText={value => handleChangeBilling(value,'phone_number')}                    pattern="^\d{10}$"
                    value = {billingDatas.phone_number}
          

                />
            </View>

            <View style={{ paddingHorizontal: 32, paddingVertical: 0, marginBottom: 16, width: '85%', borderWidth: 0.3, borderRadius: 8 }}>

                <Picker
                     value = {billingDatas.tripfrom}
                    onValueChange={value => handleChangeBilling(value,'tripfrom')} 

                >
                    <Picker.Item label="Tiruchengode" value="Tiruchengode" />

                </Picker>
            </View>
            <View style={{ paddingHorizontal: 32, paddingVertical: 0, marginBottom: 16, width: '85%', borderWidth: 0.3, borderRadius: 8 }}>

                <Picker
                 value = {billingDatas.tripto}
                    onValueChange={(value) => handleChangeBilling(value,'tripto')}
                >
                    <Picker.Item label="Trip To" value="" />
                    <Picker.Item label="Yercaud" value="Yercaud" />
                    <Picker.Item label="Kolli Hills" value="Kolli Hills" />
                    <Picker.Item label="Kodaikanal" value="Kodaikanal" />
                    <Picker.Item label="Ooty" value="Ooty" />
                    <Picker.Item label="Palani" value="Palani" />

                </Picker>
            </View>

            <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                <Input

                    icon='calendar'
                    placeholder='Enter Days'
                    autoCapitalize='none'
                    autoCompleteType='username'
                    keyboardType='default'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    value = {billingDatas.trip_days}
                    onChangeText={value => handleChangeBilling(value,'trip_days')}
                />
            </View>
            <View style={{ paddingHorizontal: 32, paddingVertical: 0, marginBottom: 16, width: '85%', borderWidth: 0.3, borderRadius: 8 }}>

                <Picker
                    selectedValue="members"
                    onValueChange={value => handleChangeBilling(value,'members')}

                >
                    <Picker.Item label="4" value="4" />


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
          value = {billingDatas.tolls}
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
          value = {billingDatas.extra}
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
          value = {billingDatas.extra_amt}
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
          value = {billingDatas.discount}
          keyboardType = 'numeric'
          onChangeText={value => handleChangeBilling(value,'discount')}
        />
      </View>
     
            <Button label='Next' onPress={() =>  { if(isValidForm()){
                navigation.navigate("Billhillstrip")
       }
        }} />

        </View>
        </ScrollView>
    )
}

export default Hillstrip
