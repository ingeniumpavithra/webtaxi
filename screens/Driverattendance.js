import React,{useState, useContext, useEffect} from 'react'
import { StyleSheet, View, SafeAreaView, Text, Alert,TextInput} from 'react-native';
import Input from '../components/input';
import Button from '../components/button';
import axios from 'axios';
import API_URL from "./env";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContextProvider";
import moment from 'moment';

import {AuthHeader} from "../header/header";

export default function  Driverattendance(props) {  
  
  const [kilometerdata, onChangeNumber] = React.useState('');
  
  const [loginData, setLoginData] = useState({});
  const [isLogin, setIsLogin] = useState(false);

const {
  AuthData,
} = useContext(AuthContext);

const getData = async () => {
  try{
    let auth = await AuthHeader();
    const res = await axios.get(
    `${API_URL}/hanshake/${AuthData.car_id}` ,{ headers: auth});
    if (res.data.data) {
      setLoginData(res.data.data);

    }
  } catch(e) {
    console.log("Error :", e);
  }
};


  useEffect(() => {
    getData();
  }, []);

  useEffect(()=> {
    if (Object.keys(loginData).length) {
      if (loginData.logout_date) {
        setIsLogin(false)
      } else {
        setIsLogin(true)
      }
    }
  },[loginData])

  const Separator = () => (
    <View style={styles.separator} />
  );
  const Separate = () => (
    <View style={styles.separate} />
  );
  
  const [load,setLoad] = useState(false)
 
  
  const navigation = useNavigation();
  const [currentDate, setcurrentDate] = useState('')
  const [currentDateWithMoment, setcurrentDateWithMoment] = useState('')
  useEffect(() => {
    var date = new Date().getDate()     //current Date
    var month = new Date().getMonth() + 1 //current month
    var year = new Date().getFullYear() //current year
    
    setcurrentDate(
      year + '-' + month + '-' + date + ''
    )

      var dateMoment = moment().utcOffset('+05:30')
                                .format('hh:mm:ss a')

      setcurrentDateWithMoment(dateMoment)
  }) 
  let car_id ='';


  let data = {
    car_id : AuthData.car_id,
    car_no : AuthData.car_no,
    date: currentDate,
    time: currentDateWithMoment,
    kilometer: kilometerdata

   
  }
  
  

  

  async function addlogin() {
    setLoad(!load)
    try{
      const response = await axios.post(`${API_URL}/drivers_logins`,data);
    if(response){
      alert(response.data.message);
      
      navigation.navigate("Mainhome");
      data.date='',
      data.time='',
      data.kilometer=''
    }
    }catch(e){
      console.log(e);
    }
 }
 

 async function addlogout() {
  setLoad(!load)
  try{
    const response = await axios.put(`${API_URL}/logout/${AuthData.car_id}`,data);
  if(response){
    alert(response.data.message);
    
    navigation.navigate("Mainhome");
    data.date='',
    data.time='',
    data.kilometer=''
  }
  }catch(e){
    console.log(e);
  }
}
  return (

    
  <SafeAreaView style={styles.container}>
    <View
         style={{
            alignItems: 'center',
          }}>
            
            <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 10, paddingVertical: 25 }}>
            DRIVER LOGINS
      </Text>
      </View>
    
    <Separate />
    <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
    <Input
          icon='calendar'
          placeholder='Date'
          autoCapitalize='none'
          keyboardType='default'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          editable={false}
          selectTextOnFocus={false}
          value = {currentDate}
          
        />
      </View>
    
      <Separate />
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
     <Input
          icon='clock'
          placeholder='time'
          autoCapitalize='none'
          keyboardType='default'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          editable={false}
          selectTextOnFocus={false}
          value = {currentDateWithMoment}
          
        />
      </View>
      <Separate />
    <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
     <Input
          icon='gauge'
          placeholder='kilometer'
          autoCapitalize='none'
          keyboardType='numeric'
          keyboardAppearance='dark'
          returnKeyType='next'
          editable={true}
          returnKeyLabel='next'
          value = {kilometerdata}
          onChangeText={onChangeNumber}
        />
      </View>
    <Separator />
    
      <View style={styles.fixToText}>
      
        { !isLogin && (
         <Button label='LOGIN' onPress={addlogin} />
        )}
     {load ?  <Button label='Loading ..' onPress={addlogout}/> :   <Button label='LOGOUT' onPress={addlogout}/> }
      </View>
    
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separate: {
    marginVertical: 8,
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
