import React from 'react'
import { View,StyleSheet ,TextInput } from 'react-native'
import { Entypo as Icon } from '@expo/vector-icons';

export default function input({icon,error,touched,value,defaultValue,...otherProps}) {


    const validationColor = !touched ? '#223e4b' : error ? '#FF5A5F' : '#223e4b';;
    return (
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 48,
          borderRadius: 8,
          borderColor: validationColor,
          borderWidth: StyleSheet.hairlineWidth,
          padding: 8
        }}
      >
        <View style={{ padding: 8 }}>
          <Icon name={icon} color={validationColor} size={16} />
        </View>
        <View style={{ flex: 1 }}>
          
          <TextInput
            underlineColorAndroid='transparent'
            placeholderTextColor='rgba(34, 62, 75, 0.7)'
            value={`${value}`}
            {...otherProps}
          />
        </View>
      </View>
    )
}
