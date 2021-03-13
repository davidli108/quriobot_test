import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import dayjs from 'dayjs';

import { actions as botActions } from '../../../redux/botSlice';
import Loader from '../../../components/Loader';
import { PAGE_SIZE } from '../../../constants';

const BotResponseScreen = ({ navigation, route }) => {
  const { botId, orgId } = route.params;
  const dispatch = useDispatch();

  const [curPage, setCurPage] = useState(0);

  const { loading, responseListInfo } = useSelector((state) => state.bot);

  useEffect(() => {
    dispatch(botActions.getResponseList({ botId, orgId, pgNum: curPage }));
  }, [botId, orgId, curPage]);

  const handlePressRow = (resId) => {
    navigation.navigate('ResponseDetailScreen', { resId });
    setCurPage(0);
  };

  return (
    <>
      <Loader loading={loading} />
      <Text style={styles.title}>Bot Responses</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Id</DataTable.Title>
          <DataTable.Title>Start</DataTable.Title>
          <DataTable.Title>Stop</DataTable.Title>
        </DataTable.Header>
        {responseListInfo.items.map((res) => (
          <TouchableOpacity onPress={() => handlePressRow(res.id)} key={res.id}>
            <DataTable.Row>
              <DataTable.Cell>{res.id}</DataTable.Cell>
              <DataTable.Cell>
                {dayjs(res.table?.start?.text).format('MMM D, YYYY hh:mm A')}
              </DataTable.Cell>
              <DataTable.Cell>
                {dayjs(res.table?.stop?.text).format('MMM D, YYYY hh:mm A')}
              </DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))}

        <DataTable.Pagination
          page={curPage}
          numberOfPages={Math.ceil(responseListInfo.count / PAGE_SIZE)}
          onPageChange={(page) => {
            setCurPage(page);
          }}
          label={`${responseListInfo.count ? curPage * PAGE_SIZE + 1 : 0} - ${
            PAGE_SIZE * (curPage + 1) > responseListInfo.count
              ? responseListInfo.count
              : PAGE_SIZE * (curPage + 1)
          }`}
        />
      </DataTable>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'black',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
  },
});
export default BotResponseScreen;
