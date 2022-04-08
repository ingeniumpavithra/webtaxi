import React, { useEffect, useState, useContext} from 'react';
import { SafeAreaView, StyleSheet, View, Button, Text} from "react-native";
import { IconButton, Colors } from 'react-native-paper';
import Card from '../components/CalCard';
import axios from 'axios';
import API_URL from "./env";
import { AuthContext } from "../context/AuthContextProvider";
import {AuthHeader} from "../header/header";
import { useNavigation } from "@react-navigation/native";
   
const Mainhome = () => {
 
const navigation = useNavigation();

  return (
    <View 
      style={{ 
        paddingHorizontal: 30, 
        paddingVertical: 20,
        marginBottom: 20, 
        width: '110%',
        display:'flex', 
        flexDirection:'row', 
        flexWrap:'wrap',
        alignItems: 'center',
      }}
    >
      
      <Card>
         <Text style={{ color: '#223e4b', fontSize: 12, marginHorizontal: 40}}>
             LOGINS
      </Text>
      
      <IconButton
        icon="account"
        color={Colors.yellow700}
        size={75}
        onPress={() => console.log('Pressed')}
       />
       
        <Button
      
        onPress={() => navigation.navigate("Driverattendance")}
        title="LOGINS"
       color="#1D8348" 
        
       />   
       
   </Card>

   <Card> 
     <Text style={{ color: '#223e4b', fontSize: 12, marginHorizontal: 40}}>
            BILLING
      </Text>
      <IconButton
        icon="newspaper"
        color={Colors.yellow700}
        size={75}
       
       />
       <Button
        onPress={() => navigation.navigate("Home")}
        title="Billing"
       color="#1D8348" 
       />  
       
   </Card>

   <Card> 
     <Text style={{ color: '#223e4b', fontSize: 12, marginHorizontal: 40}}>
            7 SEAT
      </Text>
      <IconButton
        icon="car"
        color={Colors.yellow700}
        size={75}
       
       />
      
       <Button
        onPress={() => navigation.navigate("Caronedaytrip")}
        title="7-Seat"
       color="#1D8348" 
       /> 
       
   </Card>

   <Card> 
     <Text style={{ color: '#223e4b', fontSize: 12, marginHorizontal: 40}}>
            REPORTS
      </Text>
      <IconButton
        icon="book"
        color={Colors.yellow700}
        size={75}
       
       />
      
       <Button
        onPress={() => navigation.navigate("Reports")}
        title="Reports"
       color="#1D8348" 
       /> 
       
   </Card>

   <Card> 
     <Text style={{ color: '#223e4b', fontSize: 12, marginHorizontal: 40}}>
            LOGOUT
      </Text>
      <IconButton
        icon="logout"
        color={Colors.yellow700}
        size={75}
       
       />
       <Button
        onPress={() => navigation.navigate("Login")}
        title="LOGOUT"
        color="#1D8348" 
       />  
       
   </Card>

   

    </View>
);
};


export default Mainhome;

const styles = StyleSheet.create({

  
});
