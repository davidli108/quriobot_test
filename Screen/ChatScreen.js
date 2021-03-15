import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import dayjs from 'dayjs';

const Chat_List_QUERY = gql`
  query(
    $organisation: ID!
    $bot: ID
    $page_number: Int
    $page_size: Int
    $sort_on: String
    $sort_order: String
    $search: String
    $status: [String]
    $contact: ID
  ) {
    listChat(
      organisation: $organisation
      bot: $bot
      page_number: $page_number
      page_size: $page_size
      sort_on: $sort_on
      sort_order: $sort_order
      search: $search
      status: $status
      contact: $contact
    ) {
      count
      page_count
      current_page
      has_prev_page
      has_next_page
      items {
        id
        organisation
        bot
        status
        channel_mode
        number
        subject
        is_new
        response {
          id
          __typename
        }
        agents {
          id
          organisation
          first_name
          last_name
          email
          status
          avatar
          user {
            id
            __typename
          }
          __typename
        }
        contact {
          id
          organisation
          bot
          first_name
          last_name
          email
          phone
          status
          avatar
          __typename
        }
        created_at
        updated_at
        __typename
      }
      __typename
    }
  }
`;

const ChatScreen = (props) => {
  const { loading, error, data } = useQuery(Chat_List_QUERY, {
    variables: {
      organisation: 'nVWXyEMlgorKk143',
    },
  });

  if (loading) return <Text>Loading46456...</Text>;
  if (error) return <Text>Error</Text>;
  if (!data.listChat || (data.listChat && !data.listChat.items)) return null;

  return (
    <>
      <Text style={styles.title}>Chats List</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Id</DataTable.Title>
          <DataTable.Title>Created</DataTable.Title>
          <DataTable.Title>Updated</DataTable.Title>
          <DataTable.Title>Contact</DataTable.Title>
          <DataTable.Title>Agents</DataTable.Title>
        </DataTable.Header>
        {data.listChat.items.map((chat) => (
          <DataTable.Row key={chat.id}>
            <DataTable.Cell>{chat.id}</DataTable.Cell>
            <DataTable.Cell>
              {dayjs(chat.created_at).format('MMM D, YYYY hh:mm A')}
            </DataTable.Cell>
            <DataTable.Cell>
              {dayjs(chat.updated_at).format('MMM D, YYYY hh:mm A')}
            </DataTable.Cell>
            <DataTable.Cell>{`${chat.contact.first_name || ''} ${
              chat.contact.last_name || ''
            }`}</DataTable.Cell>
            <DataTable.Cell>
              {chat.agents
                .map((ag) => `${ag.first_name || ''} ${ag.last_name || ''}`)
                .join(', ')}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
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
