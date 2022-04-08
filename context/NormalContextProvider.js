import React,{ createContext, useState, useContext, useMemo, useEffect }   from "react";

export const NormalContext = createContext(null);

export const NormalContextProvider = (props) => {

    const [waitingCharges, setWaitingCharges] = useState([0,60,120,240,320,600]); 
  const [normalData,setNormalData] = useState({
    from:'',
    to:'',
    customer_name:'',
    phone:'',
    distance_travelled:'',
    waiting_hour:0,
    waiting_chargeamount:0,
    driver_beta:0,
    tolls:'',
    extra:'',
    extra_amt:'',
    discount:''
  });

  const handleChangeBilling = (value,name) => {
    setNormalData(normalData => ({...normalData,[name]:value}));
  } 

  useEffect(()=> {
      let value = waitingCharges[normalData.waiting_hour];
        setNormalData(normalData => ({...normalData,waiting_chargeamount:value}));
   },[normalData.waiting_hour])

   useEffect(()=>{
    let value = normalData.distance_travelled >=300?300:0;
    setNormalData(normalData => ({...normalData,driver_beta:value}));
   },[normalData.distance_travelled])

    return (
      <NormalContext.Provider value={{
        normalData,
        setNormalData,
        handleChangeBilling
      }}>
        {props.children}
      </NormalContext.Provider>
    )
}