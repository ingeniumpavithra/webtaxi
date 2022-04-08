import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthHeader = async() => {
    const user =await AsyncStorage.getItem('user')
    let data =  JSON.parse(user)
  
    if (user) {
   
      return { Authorization: 'Bearer ' + data.access_token};
    } else {
      return {};
    }
  }

