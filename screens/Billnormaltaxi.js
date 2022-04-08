import React,{useContext} from "react";
import axios from 'axios';
import { StyleSheet, Text, View,} from "react-native"
import Card from '../components/CalCard'
import { useNavigation } from "@react-navigation/native";
import Button from '../components/button'
import {NormalContext} from "../context/NormalContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import API_URL from "./env";

const Billnormaltrip = () => {  
  const [load,setLoad] = useState(false) 
//useNavigation   
    const navigation = useNavigation();
 //contextprovider   
 const {
  AuthData,
} = useContext(AuthContext);
const {
        normalData,
      } = useContext(NormalContext);
  
      if(normalData.discount===''){
        normalData.discount=0;
      }
      if(normalData.tolls===''){
        normalData.tolls=0;
      }
      if(normalData.extra_amt===''){
        normalData.extra_amt=0;
      }
     
      let totalPrice = 0;
      totalPrice = normalData.distance_travelled * 12;
      let result = 0;
      normalData.distance_travelled >= 300 ? result = totalPrice + normalData.driver_beta + normalData.waiting_chargeamount : result = totalPrice + normalData.waiting_chargeamount
      let calc = 0;
      normalData.discount  >0 ? calc = (parseFloat(normalData.tolls) + parseFloat(normalData.extra_amt))-parseFloat(normalData.discount) : calc = parseFloat(normalData.tolls) + parseFloat(normalData.extra_amt);
      let value = result + calc;

      let data = {
        car_id : AuthData.car_id,
        car_no : AuthData.car_no,
        distance_charge: totalPrice,
        from: normalData.from,
        to: normalData.to,
        cus_name: normalData.customer_name,
        mobile: normalData.phone,
        distance: normalData.distance_travelled,
        w_hour: normalData.waiting_hour,
        w_charge: normalData.waiting_chargeamount,
        driver_batta: normalData.driver_beta,

        discount: normalData.discount,
        xtra_desc: normalData.extra,
        xtracharge: normalData.extra_amt,
        tollcharge: normalData.tolls,
        
        total: value,
      }

      async function addBill() {
        console.log(data);
        try{
            const response = await axios.post(`${API_URL}/taxi-trip`,data);
            if(response){
              alert(response.data.message);
              navigation.navigate("Home");
                normalData.from='',
                normalData.to='',
                normalData.customer_name='',
                normalData.phone='',
                normalData.distance_travelled='',
                normalData.waiting_hour=0,
                normalData.waiting_chargeamount=0,
                normalData.driver_beta=0,
                normalData.tolls='',
                normalData.extra='',
                normalData.extra_amt='',
                normalData.discount=''
            }
         
        }catch(e){
          console.log(e);
        }
      }

    return (
        <View
                 style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    
            <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%', justifyContent: 'center'}}>
                <Card>
                  
                <Text style={{ color: '#223e4b', fontSize: 28, marginBottom: 16, alignItems: 'center', fontWeight: 'bold', }}>
                Traffic Calculation 
               </Text> 
              <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16, }}>
                  Distance Travelled: 
                  {normalData.distance_travelled * 12 || 0}
              </Text>
              <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
                  Waiting Hours: 
                  {normalData.waiting_hour || 0} 
              </Text>
              <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
                  Waiting Charge: 
                  {normalData.waiting_chargeamount || 0}
              </Text>
              {normalData.distance_travelled >=300 &&
                <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
                    Driver Beta: 
                    {normalData.driver_beta || 0}  
                </Text>
                }
            { normalData.extra_amt >0 ? ( <View>
        <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
         Extra Amount: 
          {normalData.extra_amt}
      </Text>
              </View>):(<View></View>) }
      { normalData.tolls >0 ? ( <View>
        <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
         Toll Price: 
          {normalData.tolls}
      </Text>
          </View>):(<View></View>) }
      { normalData.discount >0 ? ( <View>
            
          <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,fontWeight: 'bold',}}>
          Subtotal :
          {result + parseFloat(normalData.tolls) + parseFloat(normalData.extra_amt)}
      </Text>
          
          <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
          Discount :
           {normalData.discount}
      </Text>
          </View>):(<View></View>) }
              <Text style={{ color: '#fb9403', fontSize: 28, marginBottom: 16, fontWeight: 'bold', }}>
                 Total : {value}
              </Text>
             
              </Card>
              </View>
              {load ?  <Button label='Loading ..' onPress={addBill}/> :<Button label='Submit' onPress={addBill}/>}
        
        
            </View>
        
          );
        };
        
        export default Billnormaltrip;
        