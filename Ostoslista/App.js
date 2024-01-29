import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const buttonPressed = () => {
    setData([...data, { key: text }]);
    setText("");

  };

  const clearData = () =>
    setData([]);

  return (

    <View style={styles.container}>
      
      <TextInput
        style={{
          borderColor: 'grey',
          borderWidth: 1,
          width: '50%',
          fontSize: 14,
        }}
          onChangeText={(input) => setText(input)}
          value={text}
          keyboardType="default"
      />

    <View style={styles.buttonContainer}>
      <View style={styles.button}>
        <Button title="Add" onPress={buttonPressed} />
      </View>
      <View style={styles.button}>
        <Button title="Clear" onPress={clearData} />
      </View>
    </View>
    
<StatusBar style="auto" />

      <View>
        <Text style={styles.text}>
          Shopping List
        </Text>
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
    justifyContent: 'space-around',
    width: '50%',
    margin: 10
  },
  button: {
    flex: 1,
    marginRight:10
  },
  text: {
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});