import {Launch} from 'models';
import {LaunchesAPI} from 'network/LaunchesAPI';
import React, {useCallback, useEffect, useState} from 'react';

import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from 'styles';
import LaunchItem from './LaunchItem';

const PAGE_SIZE = 20;

const MainScreen = () => {
  const [launches, setLaunches] = useState<any[]>([]);

  const {data, loading, fetchMore} = LaunchesAPI.useAllLaunches(PAGE_SIZE, 0);

  const loadMoreData = useCallback(() => {
    if (loading) {
      return;
    }

    fetchMore({
      variables: {
        offset: launches.length,
        limit: PAGE_SIZE,
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          launches: [...prev.launches, ...fetchMoreResult.launches],
        };
      },
    });
  }, [launches.length, loading, fetchMore]);

  const appendData = useCallback(() => {
    if (data && data.launches) {
      setLaunches(prevLaunches => [...prevLaunches, ...data.launches]);
    }
  }, [data]);

  useEffect(() => {
    appendData();
  }, [appendData]);

  const renderLaunchItem: ListRenderItem<Launch> = (
    info: ListRenderItemInfo<Launch>,
  ) => {
    const {item, index} = info;

    return <LaunchItem key={index} launch={item} />;
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.filterContainer}>
        <Text style={styles.filterText}>전체</Text>
        <Text style={styles.filterText}>출발 완료</Text>
        <Text style={styles.filterText}>출발 예정</Text>
      </View> */}
      <FlatList
        keyExtractor={(item, index) => `${item.id}_${index}`}
        style={styles.list}
        data={launches}
        numColumns={2}
        renderItem={renderLaunchItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  filterText: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: Colors.primary,
    backgroundColor: Colors.transparent,
    borderRadius: 16,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  list: {
    flex: 1,
    paddingTop: 16,
  },
});

export default MainScreen;
