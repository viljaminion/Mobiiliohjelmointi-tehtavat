import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View, Text } from 'react-native';
import History from './History';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Calculator({ navigation }) {
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

    setData([...data, { calculator, calculationResult }]);
    setResult(`Result: ${calculationResult}`);
  };

  return (
    <View style={styles.container}>
      <Text style={{ margin: 10 }}>{result}</Text>

      <TextInput
        style={styles.input}
        onChangeText={(input) => setText1(input)}
        value={text1}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        onChangeText={(input) => setText2(input)}
        value={text2}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button title="+" onPress={() => onPress('+')} />
        <Button title="-" onPress={() => onPress('-')} />
        <Button title="History" onPress={() => navigation.navigate('History', { data })} />
      </View>

      <StatusBar style="auto" />
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
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    width: '50%',
    fontSize: 14,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
