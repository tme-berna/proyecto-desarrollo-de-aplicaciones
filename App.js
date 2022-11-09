import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Pressable } from 'react-native';

import Modal from './components/Modal'

export default function App() {
  const [textItem, setTextItem] = useState("");
  const [list, setList] = useState ([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});

  const onHandleChange = (t) => setTextItem(t);

  const addItem = () => {
    setList ((currentState) => [
      ...currentState,
      { id: Math.random().toString(), value: textItem},
    ]);
    setTextItem("");
    console.log('hello from chrome!')
  };

  const selectedItem = (id) => {
    setItemSelected(list.filter((item) => item.id === id)[0]);
    setModalVisible(true);
  }

  const deleteItem = () => {
    setList((currentState) =>
    currentState.filter((item) => item.id !== itemSelected.id)
    );
    setItemSelected({});
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectedItem(item.id)}>
      <Text>{item.value}</Text>
    </TouchableOpacity>
  );

return (
  <View style={StyleSheet.container}>
    <Text style={{fontSize: 30}}>Shopping list</Text>
    <View style={styles.inputcontainer}>
      <TextInput
      placeholder='new item'
      placeholderTextColor={white}
      style={styles.inputStyle}
      value={textItem}
      onChangeText={onHandleChange}
      />
      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
    <View>
      <FlatList 
      data={list} 
      renderItem={renderItem} 
      keyExtractor={(item) => item.id}></FlatList>
    </View>
    <Modal>
      isVisible={modalVisible} actionDeleteItem={deleteItem}
    </Modal>
  </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: "#344955",
    paddingTop: 100,
    alignItems: "center",
  },
  inputcontainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  inputStyle: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 250,
  },
  button: {
    backgroundColor: "#F9AA33",
    height: 35,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
