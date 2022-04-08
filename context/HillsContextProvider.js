import React,{ createContext, useState, useContext, useMemo, useEffect }   from "react";

export const HillsContext = createContext(null);

export const HillsContextProvider = (props) => {

  const [billingDatas,setBillingData] = useState({
    customer_name:'',
    phone_number:'',
    members: 4,
    tripfrom:'Tiruchengode',
    trip_days:'',
    tolls:'',
    extra:'',
    extra_amt:'',
    discount:''
  });

  const handleChangeBilling = (value,name) => {
    setBillingData(billingDatas => ({...billingDatas,[name]:value}));
  } 

  useEffect(()=> {
   // console.log(billingData,"billingData");
  },[billingDatas])
    return (
      <HillsContext.Provider value={{
        billingDatas,
        setBillingData,
        handleChangeBilling
      }}>
        {props.children}
      </HillsContext.Provider>
    )
}