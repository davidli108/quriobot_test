import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';

import { actions as authActions } from '../../../redux/authSlice';
import { actions as botActions } from '../../../redux/botSlice';
import Loader from '../../../components/Loader';
import { PAGE_SIZE } from '../../../constants';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selOrg, setSelOrg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(0);

  const { organisations: organs, loading: authLoading, userInfo } = useSelector(
    (state) => state.auth
  );
  const { loading: botLoading, botListInfo } = useSelector(
    (state) => state.bot
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(authActions.getOrganisations({}));
    }
  }, [userInfo]);

  useEffect(() => {
    setLoading(botLoading || authLoading);
  }, [authLoading, botLoading]);

  useEffect(() => {
    if (!authLoading && organs.length) {
      setSelOrg(organs[0].id);
      dispatch(botActions.getBotList({ orgId: organs[0].id, pgNum: 0 }));
    }
  }, [organs, authLoading]);

  useEffect(() => {
    if (selOrg)
      dispatch(botActions.getBotList({ orgId: selOrg, pgNum: curPage }));
  }, [curPage]);

  const handlePressRow = (botId) => {
    navigation.navigate('BotReponseScreen', { botId, orgId: selOrg });
    setCurPage(0);
  };

  const handleChangeOrg = (value, index) => {
    setSelOrg(value);
    setCurPage(0);
    dispatch(
      botActions.getBotList({ orgId: organs[index].id, pgNum: curPage })
    );
  };

  return (
    <>
      <Loader loading={loading} />
      <View style={styles.orgWrapper}>
        <Text>Organziation: </Text>
        <Picker
          selectedValue={selOrg}
          style={{ height: 50, width: 250 }}
          onValueChange={handleChangeOrg}
        >
          {organs.map((org, _i) => (
            <Picker.Item label={org.text} value={org.id} key={org.id} />
          ))}
        </Picker>
      </View>
      <Text style={styles.title}>Bots List: </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Id</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
        </DataTable.Header>
        {botListInfo.items.map((bot) => (
          <TouchableOpacity onPress={() => handlePressRow(bot.id)} key={bot.id}>
            <DataTable.Row>
              <DataTable.Cell>{bot.id}</DataTable.Cell>
              <DataTable.Cell>{bot.name}</DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))}

        <DataTable.Pagination
          page={curPage}
          numberOfPages={Math.ceil(botListInfo.count / PAGE_SIZE)}
          onPageChange={(page) => {
            setCurPage(page);
          }}
          label={`${botListInfo.count ? curPage * PAGE_SIZE + 1 : 0} - ${
            PAGE_SIZE * (curPage + 1) > botListInfo.count
              ? botListInfo.count
              : PAGE_SIZE * (curPage + 1)
          }`}
        />
      </DataTable>
    </>
  );
};

const styles = StyleSheet.create({
  orgWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
  },
  title: {
    color: 'black',
    fontSize: 24,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
  },
});

export default HomeScreen;
