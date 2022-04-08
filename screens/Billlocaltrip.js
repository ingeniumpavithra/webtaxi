import React,{useContext} from "react";
import { StyleSheet, Text, View,} from "react-native"
import Card from '../components/CalCard'
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import Button from '../components/button'
import { LocalContext } from "../context/LocalContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import API_URL from "./env";

const Billlocaltrip = () => {   

  const [load,setLoad] = useState(false) 
    //useNavigation   
    const navigation = useNavigation();
    const {
      AuthData,
    } = useContext(AuthContext);
    const {
        localData,
        handleChangeBilling
      } = useContext(LocalContext);

      if(localData.discount===''){
        localData.discount=0;
      }
      if(localData.tolls===''){
        localData.tolls=0;
      }
      if(localData.extra_amt===''){
        localData.extra_amt=0;
      }    
     
      let xtrakmcharge = localData.xtrakm * 12;
      let result = 0;
      xtrakmcharge > 0 ? result = localData.tripCharge + xtrakmcharge : result = localData.tripCharge;
      
      let calc = 0;
      localData.discount  >0 ? calc = (parseFloat(localData.tolls) + parseFloat(localData.extra_amt))-parseFloat(localData.discount) : calc = parseFloat(localData.tolls) + parseFloat(localData.extra_amt);
      let value = calc + result;

      let data = {
        car_id : AuthData.car_id,
        car_no : AuthData.car_no,
        triphr: localData.triphr,
        tripkms: localData.tripkms,
        payment: localData.tripCharge,
        cus_name: localData.name,
        mobile: localData.phone,
        xtrakm: localData.xtrakm,
        xtrakmcharge: xtrakmcharge,

        discount: localData.discount,
        xtra_desc: localData.extra,
        xtracharge: localData.extra_amt,
        tollcharge: localData.tolls,
        total: value,
    }

      async function addBill() {
        console.log(data);
        try{
          const response = await axios.post(`${API_URL}/local-trip`, data);
            if(response){
              alert(response.data.message);
              navigation.navigate("Home");
                localData.name='',
                localData.phone='',
                localData.tripkms=0,
                localData.triphr=0,
                localData.xtrakm='',
                localData.tolls='',
                localData.extra='',
                localData.extra_amt='',
                localData.discount=''
            
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
                  Trip Hour : 
                  {localData.triphr || 0}
              </Text>
              <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16, }}>
                  Allowed Distance(km) : 
                  {localData.tripkms || 0}
              </Text>
              <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
                 Trip Payment : 
                 {localData.tripCharge || 0}
              </Text>
              <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
                  Extra kms : 
                  {localData.xtrakm || 0}
              </Text>
              
                <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
                   Extra kms charge : 
                   {localData.xtrakm * 12 || 0}
                </Text>
       { localData.extra_amt >0 ? ( <View>
        <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
         Extra Amount: 
          {localData.extra_amt}
      </Text>
              </View>):(<View></View>) }
      { localData.tolls >0 ? ( <View>
        <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
         Toll Price: 
          {localData.tolls}
      </Text>
          </View>):(<View></View>) }
      { localData.discount >0 ? ( <>
            
          <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,fontWeight: 'bold',}}>
          Subtotal :
          {result + parseFloat(localData.tolls) + parseFloat(localData.extra_amt)}
      </Text>
          
          <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
          Discount :
           {localData.discount}
      </Text>
          </>):(<View></View>) }
              <Text style={{ color: '#fb9403', fontSize: 28, marginBottom: 16, fontWeight: 'bold', }}>
                 Total : { value }
              </Text>
             
              </Card>
              </View>
               {load ?  <Button label='Loading ..' onPress={addBill}/> :<Button label='Submit' onPress={addBill}/>}
        
        
            </View>
        
          );
        };
        
        export default Billlocaltrip;