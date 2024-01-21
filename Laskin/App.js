import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View, Text } from 'react-native';

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [result, setResult] = useState("");

  const onPress = (button) => {
    const input1 = parseFloat(text1);
    const input2 = parseFloat(text2);

    if (isNaN(input1) || isNaN(input2)) {
      Alert.alert('Dont use letters, numbers only!');
      return;
    }

    let calculator ="";

    if (button === '+') {
      calculator = input1 + input2;
    } else if (button === '-') {
      calculator = input1 - input2;
    }

    setResult(`Result: ${calculator}`);
  }


return (
    
    <View style={styles.container}>

    <Text style={{ margin: 10 }}>{result}</Text>

      <TextInput
        style={{
          borderColor: 'grey',
          borderWidth: 1,
          width: '50%',
          fontSize: 14,
        }}
        onChangeText={(input) => setText1(input)}
        value={text1}
        keyboardType="numeric"
      />

      <TextInput
        style={{
          borderColor: 'grey',
          borderWidth: 1,
          width: '50%',
          fontSize: 14,
        }}
        onChangeText={(input) => setText2(input)}
        value={text2}
        keyboardType="numeric"
      />

      <View style={styles.button}>
        <Button title="+" onPress={() => onPress('+')} />
        <View style={{ width: 25 }} />
        <Button title="-" onPress={() => onPress('-')} />
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    width: 50,
    margin: 10,
  },
});
