import React, { useEffect, useState, useContext} from 'react';
import {Text,View,StyleSheet,ScrollView} from 'react-native';
import Card from '../components/CalCard';
import axios from 'axios';
import { AuthContext } from "../context/AuthContextProvider";
import API_URL from "./env";
import {AuthHeader} from "../header/header";


export default function  Reports(props) {
  

const [Data, setData] = useState([]);
const {
  AuthData,
} = useContext(AuthContext);

const getData = async () => {
  try{
    let auth = await AuthHeader();
  const res = await axios.get(
    `${API_URL}/reports/${AuthData.car_id}` ,{ headers: auth});
  
    if (res.data.data) {
 
    setData(res.data.data);
    }
  } catch(e) {
    console.log("Error :", e);
  }
};

useEffect(() => {
  getData();
}, []);


  return (
    <ScrollView>
    <View style={{ flex: 1, backgroundColor:'#f8f8f8'}}>
      <View style={styles.headernews}>
      
      </View>

      {Data && Data.map((rowData) => (
        <Card>
        
        <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          Date : {rowData.date}</Text>
          <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          Time : {rowData.time}</Text>
          <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          Name : {rowData.cus_name}</Text>
          <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          Mobile : {rowData.time}</Text>
          <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          Trip : {rowData.trip_type}</Text>
          <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          From : {rowData.trip_from ? rowData.trip_from : '--'}</Text>
          <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          To : {rowData.trip_to ? rowData.trip_to : '--'}</Text>
          <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          Distance : {rowData.distance}</Text>
          <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          Total : {rowData.total}</Text>
          <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          Waiting : {rowData.w_charge ? rowData.w_charge : '--'}</Text>
          <Text style={{ color: '#223e4b', fontSize: 18, marginBottom: 16, }}>
          Driver Batta : {rowData.driver_batta ? rowData.driver_batta : '--'}</Text>
      </Card>
      ))}
   
    </View></ScrollView>
  )
}
  
const styles = StyleSheet.create({
 
});