import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton ({ onPress, styles, text, color }) {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={[styles.AndroidSubmitBtn, { backgroundColor: color }]}>

      <Text style={styles.submitBtnText}>{text}</Text>

    </TouchableOpacity>
  )
}
