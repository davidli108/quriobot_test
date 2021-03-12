import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import dayjs from 'dayjs';

const ResponseDetailScreen = ({ navigation, route }) => {
  const { resId } = route.params;

  const { responseListInfo } = useSelector((state) => state.bot);

  const response = useMemo(() => {
    const r = responseListInfo.items.find((res) => res.id === resId);
    if (!r) return null;
    return r;
  }, [responseListInfo, resId]);

  const responseInfoFields = [
    ['Bot Name', 'bot_name'],
    ['Completed (true/false)', 'isComplete'],
    ['Channel', 'channel'],
    ['Device', 'info_deviceType'],
    ['Referrer URL', 'info_referer'],
    ['Is a returning visitor', 'info_isReturning'],
    ['Visit count', 'info_visitCount'],
    ['Start', 'start'],
    ['Stop', 'stop'],
    ['Language', 'user_language'],
  ];

  return (
    <>
      <Text style={styles.title}>Overall info</Text>
      <DataTable>
        {responseInfoFields.map((field, _i) => (
          <DataTable.Row key={_i}>
            <DataTable.Cell>{field[0]}</DataTable.Cell>
            <DataTable.Cell>
              {field[1] === 'start' || field[1] === 'stop'
                ? dayjs(response.table[field[1]].text).format(
                    'MMM D, YYYY hh:mm A'
                  )
                : response.table[field[1]].text}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Text style={styles.title}>Bot</Text>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>Name</DataTable.Cell>
          <DataTable.Cell>{response.bot.name}</DataTable.Cell>
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

export default ResponseDetailScreen;
