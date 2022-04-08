import React,{ createContext, useState, useContext, useMemo, useEffect }   from "react";

export const LocalContext = createContext(null);

export const LocalContextProvider = (props) => {

  const [xtracharge, setXtraCharges] = useState([0,250,500]);
  const [tripKms, setKms] = useState([0,10,20]);
  const [localData,setLocalData] = useState({
    name:'',
    phone:'',
    tripkms:0,
    triphr:0,
    xtrakm:'',
    tolls:'',
    extra:'',
    extra_amt:'',
    discount:''

  });

  const handleChangeBilling = (value,name) => {
    setLocalData(localData => ({...localData,[name]:value}));
  } 

  useEffect(()=> {
    let value = xtracharge[localData.triphr];
    setLocalData(localData => ({...localData,tripCharge:value}));
    let kms = tripKms[localData.triphr];
    setLocalData(localData => ({...localData,tripkms:kms}));
 },[localData.triphr])
  

    return (
      <LocalContext.Provider value={{
        localData,
        setLocalData,
        handleChangeBilling
      }}>
        {props.children}
      </LocalContext.Provider>
    )
}