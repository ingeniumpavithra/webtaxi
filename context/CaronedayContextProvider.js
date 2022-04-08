import React,{ createContext, useState, useContext, useMemo, useEffect }   from "react";

export const CaronedayContext = createContext(null);

export const CaronedayContextProvider = (props) => {

  const [caronedayData,setCaronedayData] = useState({
    customer_name:'',
    phone_number:'',
    kmrupees:'',
    distance_travelled:'',
    tolls:'',
    extra:'',
    extra_amt:'',
    discount:'',
  });

  const handleChangeCaroneday = (value,name) => {
    setCaronedayData(caronedayData => ({...caronedayData,[name]:value}));
  } 

  useEffect(()=> {
   // console.log(caronedayData,"caronedayData");
  },[caronedayData])
    return (
      <CaronedayContext.Provider value={{
        caronedayData,
        setCaronedayData,
        handleChangeCaroneday
      }}>
        {props.children}
      </CaronedayContext.Provider>
    )
}