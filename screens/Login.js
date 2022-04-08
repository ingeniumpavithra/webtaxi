import React,{useEffect} from 'react'
import { View, Text  } from 'react-native'
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import axios from 'axios';
import Button from '../components/button'
import Input from '../components/input'
import { useNavigation } from "@react-navigation/native";
import API_URL from "./env";



export default function Login() {
  

  useEffect(() => {
    async function loginCheck() {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        // We have data!!
        if(user.role==="admin"){
          alert(" Admin cannot access mobile., Please use desktop");
          navigation.navigate("Login");
        } else {
          
          navigation.navigate("Mainhome"); 
        }
      }
    }
    loginCheck();
  }, [])

  const navigation = useNavigation(
    {
    navigationOptions: {
      header: {
        visible: false,
      }
    }
  }
  );
  
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required')
  });

  const { handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched } = useFormik({
      validationSchema: LoginSchema,
      initialValues: { username: '', password: '' },
      onSubmit: () => {
        async function login() {
         let data = {
          email : values.username,
          password : values.password,
      }
          try{
            const response = await axios.post(`${API_URL}/login`, data);

            if(response.data.user.role==="admin"){
              alert(" Admin cannot access mobile., Please use desktop");
              navigation.navigate("Login");
            }else{
              alert("Login Sucess");
              navigation.navigate("Mainhome");
              AsyncStorage.setItem(
                "user",
                JSON.stringify(response.data)
               ).then(() => console.log("userID save"));
            }
          
          }catch(e){
            alert(" Invalid username or password"+e);
            console.log(e);
          }
      }
      login();
      
      }
      
        
    });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16 }}>
        Login
      </Text>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='user'
          placeholder='Enter your Username'
          autoCapitalize='none'
          autoCompleteType='username'
          keyboardType='default'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          error={errors.username}
          value={values.username}
          touched={touched.username}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <Input
          icon='key'
          placeholder='Enter your password'
          secureTextEntry
          autoCompleteType='password'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='go'
          returnKeyLabel='go'
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          value={values.password}
          touched={touched.password}
        />
      </View>
      <Button label='Login' onPress={handleSubmit} />
    </View>
  )
}
