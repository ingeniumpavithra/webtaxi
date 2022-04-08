import React,{useContext,useState} from "react";
import { StyleSheet, Text, View} from "react-native"
import Card from '../../components/CalCard'
import axios from 'axios';
import Button from '../../components/button';
import { CaronedayContext } from "../../context/CaronedayContextProvider";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContextProvider";
import API_URL from "./../env";

  
const Billcaronedaytrip = () => {  
  const [load,setLoad] = useState(false) 
  const navigation = useNavigation();
  
  const {
    caronedayData,
  } = useContext(CaronedayContext);
  const {
    AuthData,
  } = useContext(AuthContext);
  
  if(caronedayData.discount===''){
    caronedayData.discount=0;
  }
  if(caronedayData.tolls===''){
    caronedayData.tolls=0;
  }
  if(caronedayData.extra_amt===''){
    caronedayData.extra_amt=0;
  }

 let car_id ='';
 let distance_charge = 0;
 let kmsrupees = caronedayData.kmrupees
 distance_charge = caronedayData.distance_travelled * caronedayData.kmrupees;
    let totalPrice = (distance_charge);
    let calc = 0;
    caronedayData.discount  >0 ? calc = (parseFloat(caronedayData.tolls) + parseFloat(caronedayData.extra_amt))-parseFloat(caronedayData.discount) : calc = parseFloat(caronedayData.tolls) + parseFloat(caronedayData.extra_amt);
      const result = totalPrice + calc;

  let data = {
    car_id : AuthData.car_id,
    car_no : AuthData.car_no,
    distance_charge: distance_charge,
    cus_name: caronedayData.customer_name,
    mobile: caronedayData.phone_number,
    kmrupees :caronedayData.kmrupees,
    distance: caronedayData.distance_travelled,
    tolls: caronedayData.tolls,
    extra: caronedayData.extra,
    extra_amt: caronedayData.extra_amt,
    discount: caronedayData.discount,
      xtra_desc: caronedayData.extra,
      xtracharge: caronedayData.extra_amt,
      tollcharge: caronedayData.tolls,
    total: result
   
  }
  console.log(addBill)

  async function addBill() {
    setLoad(!load)
    try{
      const response = await axios.post(`${API_URL}/Caronedaytrip`,data);
    if(response){
      alert(response.data.message);
      navigation.navigate("Mainhome");
      caronedayData.customer_name='',
      caronedayData.phone_number='',
      caronedayData.kmrupees='',
      caronedayData.distance_travelled='',
      caronedayData.tolls='',
      caronedayData.extra='',
      caronedayData.extra_amt='',
      caronedayData.discount=''
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
       <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
          Total KMs  :  
         {caronedayData.distance_travelled ||0}
      </Text>
      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
          Price / km :  
         {caronedayData.kmrupees ||0}
      </Text>
      
      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
         Total KM Price: 
          {distance_charge}
      </Text>
      
      { caronedayData.extra_amt >0 ? ( <View>
        <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
         Extra Amount: 
          {caronedayData.extra_amt}
      </Text>
              </View>):(<View></View>) }
      { caronedayData.tolls >0 ? ( <View>
        <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
         Toll Price: 
          {caronedayData.tolls}
      </Text>
          </View>):(<View></View>) }
      { caronedayData.discount >0 ? ( <View>
            
          <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,fontWeight: 'bold',}}>
          Subtotal :
          {totalPrice + parseFloat(caronedayData.tolls) + parseFloat(caronedayData.extra_amt)}
      </Text>
          
          <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
          Discount :
           {caronedayData.discount}
      </Text>
          </View>):(<View></View>) }
      
      
      <Text style={{ color: '#fb9403', fontSize: 28, marginBottom: 16, fontWeight: 'bold', }}>
         Total :
         {result }
      </Text>
     
      </Card>
      </View>
     
      {load ?  <Button label='Loading ..' onPress={addBill} /> :  <Button label='Submit' onPress={addBill}/>}
     


    </View>

  );
};

export default Billcaronedaytrip;

