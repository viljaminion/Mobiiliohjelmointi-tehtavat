
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { Button, StyleSheet, TextInput, View, Text, FlatList } from 'react-native';


const db = SQLite.openDatabase('shoppinglist.db');

export default function App() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
    tx.executeSql('create table if not exists shoppinglistitem (id integer primary key not null, product text, amount text);');
    }, () => console.error("Error when creating DB"), updateList);
    }, []);
  
  const saveItem = () => {
    db.transaction(tx => {
    tx.executeSql('insert into shoppinglistitem (product, amount) values (?, ?);',
    [product, amount]);
    }, null, updateList)
    }

    const updateList = () => {
      db.transaction(tx => {
      tx.executeSql('select * from shoppinglistitem;', [], (_, { rows }) =>
      setData(rows._array)
      );
      }, null, null);
      }

    const deleteItem = (id) => {
      db.transaction(
      tx => tx.executeSql('delete from shoppinglistitem where id = ?;', [id]), null, updateList)
      }
        
      

  return (

    <View style={styles.container}>

      <Text style={styles.text}>Shopping List</Text>
      
      <TextInput style={{width: 200, height:40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Product'
          onChangeText={product => setProduct(product)}
          value={product}/>
      <TextInput style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Amount'
          onChangeText={amount => setAmount(amount)}
          value={amount}/>
      <Button onPress={saveItem} title="Save" />

      <FlatList
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) =>
      <View style={styles.container}>
      <Text>{item.product} {item.amount} </Text>
<      Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>Bought</Text>
      </View>}
        data={data}
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
    fontSize: 30,
    paddingBottom: 50,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});