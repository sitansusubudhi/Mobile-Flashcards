import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function TextButton ({ onPress, styles, text, color }) {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={[styles.AndroidSubmitBtn, { backgroundColor: color }]}>

      <Text style={styles.submitBtnText}>{text}</Text>

    </TouchableOpacity>
  );
}
