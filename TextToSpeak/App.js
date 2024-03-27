import * as React from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';



export default function App() {
  const [text, setText] = React.useState('');

  const speak = () => {
    Speech.speak(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          borderColor: 'grey',
          borderWidth: 1,
          width: '50%',
          fontSize: 14,
        }}
          onChangeText={(text) => setText(text)}
          value={text}
          keyboardType="default"
      />
      <View style={styles.button}>
      <Button title="Text To Speak" onPress={speak} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    padding: 8,
  },
  button: {
    margin: 10,
    width: 75,
  }
  },
);
