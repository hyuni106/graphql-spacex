import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {ScreenName, Props} from 'views';
import {Colors} from 'styles';
import {LaunchesAPI} from 'network/LaunchesAPI';
import {Launch} from 'models';
import LaunchImagePager from './LaunchImagePager';

export interface LaunchDetailScreenProps {
  launchId: string;
}

const LaunchDetailScreen = ({
  route,
}: Props<ScreenName.LaunchDetailScreen>): React.ReactElement => {
  const {launchId} = route.params;

  const {data, loading} = LaunchesAPI.useLaunchDetail(launchId);

  const [launch, setLaunch] = useState<Launch>();
  const [launchImgList, setLaunchImgList] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.launch) {
      setLaunch(data.launch);
      setLaunchImgList([...data.launch.links.flickr_images]);
    }
  }, [data]);

  return (
    <View style={styles.root}>
      {!loading && launchImgList.length > 0 && (
        <LaunchImagePager imgList={launchImgList} />
      )}
      <Text>{launch?.mission_name}</Text>
      <Text>{launch?.details}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
});

export default LaunchDetailScreen;
