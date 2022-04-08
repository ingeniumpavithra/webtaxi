import React,{useContext} from "react";
import { StyleSheet, Text, View,} from "react-native"
import Card from '../components/CalCard'
import axios from 'axios';
import Button from '../components/button'
import { AuthContext } from "../context/AuthContextProvider";
import {HillsContext} from "../context/HillsContextProvider";
import { useNavigation } from "@react-navigation/native";
import API_URL from "./env";

  
const Billhillstrip = () => {   

  const [load,setLoad] = useState(false) 
  const navigation = useNavigation();
  const {
    AuthData,
  } = useContext(AuthContext);

  const {
    billingDatas,
  } = useContext(HillsContext);

  if(billingDatas.discount===''){
    billingDatas.discount=0;
  }
  if(billingDatas.tolls===''){
    billingDatas.tolls=0;
  }
  if(billingDatas.extra_amt===''){
    billingDatas.extra_amt=0;
  }

  let batta = billingDatas.trip_days * 300;
  let pay= 0;

  if(billingDatas.tripto){
    billingDatas.tripto==='Yercaud'? pay=3000 :billingDatas.tripto==='Kolli Hills'? pay=3500 :billingDatas.tripto==='Kodaikanal'? pay=6000 :billingDatas.tripto==='Ooty'? pay=6000 :billingDatas.tripto==='Palani'? pay=3000 : pay=0
    }

    let result = pay + batta;
    let calc = 0;
    billingDatas.discount  >0 ? calc = (parseFloat(billingDatas.tolls) + parseFloat(billingDatas.extra_amt))-parseFloat(billingDatas.discount) : calc = parseFloat(billingDatas.tolls) + parseFloat(billingDatas.extra_amt);
      
    let value = result + calc;

  let data = {
    car_id : AuthData.car_id,
    car_no : AuthData.car_no,
    trip_from: billingDatas.tripfrom,
    trip_to: billingDatas.tripto,
    payment: pay,
    cus_name: billingDatas.customer_name,
    mobile: billingDatas.phone_number,
    members: billingDatas.members,
    trip_days: billingDatas.trip_days,
    driver_batta: batta,

    discount: billingDatas.discount,
    xtra_desc: billingDatas.extra,
    xtracharge: billingDatas.extra_amt,
    tollcharge: billingDatas.tolls,
    total: value
  }

   async function addBill() {
    
    try{
        const response = await axios.post(`${API_URL}/hills-trip`,data);
        if(response){
          alert(response.data.message);
          navigation.navigate("Home");
          billingDatas.customer_name='',
          billingDatas.phone_number='',
          billingDatas.members= 4,
          billingDatas.tripfrom='Tiruchengode',
          billingDatas.trip_days='',
          billingDatas.tolls='',
          billingDatas.extra='',
          billingDatas.extra_amt='',
          billingDatas.discount=''
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
        <Card initPayment={""} pricePerKm={""} totalPrice={""}>
          
        <Text style={{ color: '#223e4b', fontSize: 28, marginBottom: 16, alignItems: 'center', fontWeight: 'bold', }}>
        Traffic Calculation 
       </Text> 
      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16, }}>
          Mobile : 
          {billingDatas.phone_number }
      </Text>
      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16, }}>
          Trip payment : 
          {pay || 0}
      </Text>

      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
          Days :  
         {billingDatas.trip_days || 0}
      </Text>
      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
          Driver Batta(Rs):  
          {batta || 0}
      </Text>
      { billingDatas.extra_amt >0 ? ( <View>
        <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
         Extra Amount: 
          {billingDatas.extra_amt}
      </Text>
              </View>):(<View></View>) }
      { billingDatas.tolls >0 ? ( <View>
        <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
         Toll Price: 
          {billingDatas.tolls}
      </Text>
          </View>):(<View></View>) }
      { billingDatas.discount >0 ? ( <View>
            
          <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,fontWeight: 'bold',}}>
          Subtotal :
          {result + parseFloat(billingDatas.tolls) + parseFloat(billingDatas.extra_amt)}
      </Text>
          
          <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
          Discount :
           {billingDatas.discount}
      </Text>
          </View>):(<View></View>) }
          <Text style={{ color: '#fb9403', fontSize: 28, marginBottom: 16, fontWeight: 'bold', }}>
                 Total : { value }
              </Text>
      
      </Card>
      </View>
      {load ?  <Button label='Loading ..' onPress={addBill}/> : <Button label='Submit' onPress={addBill}/>}

    </View>

  );
};

export default Billhillstrip;

