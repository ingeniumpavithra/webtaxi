import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function  Card(props) {
  return (
    <View style={styles.Card}>
   <View style={styles.cardcontent}>
   <View style={styles.container}>
     { props.children }
   </View>
   </View>
   </View>
  )
}

const styles = StyleSheet.create({
 Card: {
     borderRadius: 5,
     elevation: 3,
     backgroundColor: 'white',
     shadowOffset:{ width: 1, height: 1,},
     shadowColor: '#fb9403',
     shadowOpacity: 0.3,
     shadowRadius: 2,
     marginHorizontal: 2,
     marginVertical: 6,
     alignItems: 'center',
     marginLeft: 15,
    
    },
    cardcontent: {
        marginHorizontal: 5,
        marginVertical: 20,
      },
      container: {
             },
    });