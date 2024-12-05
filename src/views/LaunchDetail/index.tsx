import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScaledSize,
  Text,
} from 'react-native';

import {ScreenName, Props} from 'views';
import {Colors} from 'styles';
import {LaunchesAPI} from 'network/LaunchesAPI';
import PagerView from 'react-native-pager-view';
import {Launch} from 'models';
import {hexAlpha} from 'styles/colors';

export interface LaunchDetailScreenProps {
  launchId: string;
}

const LaunchDetailScreen = ({
  route,
}: Props<ScreenName.LaunchDetailScreen>): React.ReactElement => {
  const {launchId} = route.params;

  const window = useWindowDimensions();
  const styles = useMemo(() => createStyles(window), [window]);

  const {data, loading} = LaunchesAPI.useLaunchDetail(launchId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [launch, setLaunch] = useState<Launch>();
  const [launchImgList, setLaunchImgList] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (data && data.launch) {
      setLaunch(data.launch);
      setLaunchImgList([...data.launch.links.flickr_images]);
    }
  }, [data]);

  const renderPagerImageItem = () => {
    return launchImgList.map((item: string, idx: number) => (
      <Image
        key={`${idx}`}
        style={styles.launchImage}
        source={{uri: item}}
        resizeMode="cover"
      />
    ));
  };

  return (
    <View style={styles.root}>
      {!loading && launchImgList.length > 0 && (
        <View style={styles.pagerContainer}>
          <PagerView
            style={styles.pagerView}
            initialPage={pageIndex}
            collapsable={false}
            onPageSelected={e => setPageIndex(e.nativeEvent.position)}>
            {renderPagerImageItem()}
          </PagerView>
          <Text style={styles.paginationText}>{`${pageIndex + 1} / ${
            launchImgList.length
          }`}</Text>
        </View>
      )}
    </View>
  );
};

const createStyles = (scaledSize: ScaledSize) => {
  return StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors.white,
    },
    pagerContainer: {
      width: scaledSize.width,
      height: 250,
    },
    pagerView: {
      width: '100%',
      height: '100%',
    },
    launchImage: {
      flex: 1,
    },
    paginationText: {
      position: 'absolute',
      right: 1,
      bottom: 1,
      marginRight: 12,
      marginBottom: 8,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 16,
      backgroundColor: hexAlpha(Colors.white, 0.6),
    },
  });
};

export default LaunchDetailScreen;
