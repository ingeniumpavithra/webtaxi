import React,{ createContext, useState, useContext, useMemo, useEffect }   from "react";

export const BillingContext = createContext(null);

export const BillingContextProvider = (props) => {

  const [billingData,setBillingData] = useState({
    customer_name:'',
    phone_number:'',
    initial_payment:1800,
    distance_travelled:'',
    tolls:'',
    extra:'',
    extra_amt:'',
    discount:'',
  });

  const handleChangeBilling = (value,name) => {
    setBillingData(billingData => ({...billingData,[name]:value}));
  } 

  useEffect(()=> {
   // console.log(billingData,"billingData");
  },[billingData])
    return (
      <BillingContext.Provider value={{
        billingData,
        setBillingData,
        handleChangeBilling
      }}>
        {props.children}
      </BillingContext.Provider>
    )
}