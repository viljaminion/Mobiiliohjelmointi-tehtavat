import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function History({ route }) {
  const { data } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={styles.historyFont}>History</Text>
      
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ margin: 3 }}>
            <Text>{item.calculator} = {item.calculationResult}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    historyFont: {
        marginTop: '30%',
        fontWeight: 'bold',
        fontSize: 18, 
        marginBottom: 10
    }
}
);