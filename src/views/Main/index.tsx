import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';

import {Launch} from 'models';
import {LaunchesAPI} from 'network/LaunchesAPI';
import {Colors} from 'styles';
import LaunchItem from './LaunchItem';
import Loading from 'views/commons/Loading';

const PAGE_SIZE = 50;

const MainScreen = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {data, loading, fetchMore} = LaunchesAPI.useAllLaunches(PAGE_SIZE, 0);

  const loadMoreData = useCallback(async () => {
    if (loading) {
      return;
    }
    setIsLoading(true);

    try {
      await fetchMore({
        variables: {
          offset: launches.length,
          limit: PAGE_SIZE,
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return prev;
          }

          const newLaunches = fetchMoreResult.launches.filter(
            newLaunch =>
              !prev.launches.some(prevLaunch => prevLaunch.id === newLaunch.id),
          );

          return {
            launches: [...prev.launches, ...newLaunches],
          };
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [launches.length, loading, fetchMore]);

  const appendData = useCallback(() => {
    if (data && data.launches) {
      const uniqueLaunches = data.launches.filter(
        newLaunch =>
          !launches.some(prevLaunch => prevLaunch.id === newLaunch.id),
      );
      setLaunches(prevLaunches => [...prevLaunches, ...uniqueLaunches]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <FlatList
        keyExtractor={(item, index) => `${item.id}_${index}`}
        style={styles.list}
        data={launches}
        numColumns={2}
        renderItem={renderLaunchItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={1}
      />
      {(loading || isLoading) && <Loading />}
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
