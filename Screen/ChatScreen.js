import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const ChatScreen = (props) => {
  return (
    <>
      <Text style={styles.title}>Chats List</Text>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: 'black',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
  },
});

export default ChatScreen;
