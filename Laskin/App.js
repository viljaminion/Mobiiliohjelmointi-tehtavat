import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View, Text, FlatList } from 'react-native';

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState([]);

  const onPress = (button) => {
    const input1 = parseFloat(text1);
    const input2 = parseFloat(text2);

    if (isNaN(input1) || isNaN(input2)) {
      Alert.alert('Dont use letters, numbers only!');
      return;
    }

  let calculator = "";
  let calculationResult = "";

    if (button === '+') {
      calculator = `${input1} + ${input2}`;
      calculationResult = `${input1 + input2}`;
    } else if (button === '-') {
      calculator = `${input1} - ${input2}`;
      calculationResult = `${input1 - input2}`;
    }

  setData([...data, { key: `${calculator} = ${calculationResult}`, result: calculationResult }]);
  setResult(`Result: ${calculationResult}`);

  };

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

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="+" onPress={() => onPress('+')} />
        </View>
        <View style={styles.button}>
          <Button title="-" onPress={() => onPress('-')} />
        </View>
      </View>

      <StatusBar style="auto" />

      <View>
        <Text>History</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '30%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '20%',
    margin: 10,
  },
  button: {
    flex: 1,
    marginRight:10
  },
});
