import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View, Text } from 'react-native';

export default function App() {
  const [guess, setGuess] = useState("");
  const [randomNumber, setRandomNumber] = useState(makeRandomNumber());
  const [result, setResult] = useState("");
  const [tries, setTries] = useState(0);

  function makeRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const onPress = () => {
    const userGuess = parseInt(guess);

    if (userGuess == randomNumber) {
      Alert.alert(`You guessed the number in ${tries} guesses.`);
      return;
    }

    setTries(tries + 1);

    if (userGuess === randomNumber) {
      setResult(`Correct!`);
    } else if (userGuess < randomNumber) {
      setResult(`Your guess ${userGuess} is too low`);
    } else {
      setResult(`Your guess ${userGuess} is too high`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the number between 1-100</Text>

      <TextInput
        style={{
          borderColor: 'grey',
          borderWidth: 1,
          width: '50%',
          fontSize: 14
        }}
        onChangeText={(input) => setGuess(input)}
        value={guess}
        keyboardType="numeric"
      />

      <View style={styles.button}>
        <Button title="Make a guess" onPress={onPress} />
      </View>

      <Text style={{ margin: 10 }}>{result}</Text>

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  button: {
    marginTop: 10,
  },
});
