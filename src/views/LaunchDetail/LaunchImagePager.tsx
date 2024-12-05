import React, {useMemo, useState} from 'react';
import {
  Image,
  ScaledSize,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

import {Colors} from 'styles';
import {hexAlpha} from 'styles/colors';

interface LaunchImagePagerProps {
  imgList: string[];
}

const LaunchImagePager = (props: LaunchImagePagerProps) => {
  const {imgList} = props;

  const window = useWindowDimensions();
  const styles = useMemo(() => createStyles(window), [window]);

  const [pageIndex, setPageIndex] = useState(0);

  const renderPagerImageItem = () => {
    return imgList.map((item: string, idx: number) => (
      <Image
        key={`${idx}`}
        style={styles.launchImage}
        source={{uri: item}}
        resizeMode="cover"
      />
    ));
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={pageIndex}
        collapsable={false}
        onPageSelected={e => setPageIndex(e.nativeEvent.position)}>
        {renderPagerImageItem()}
      </PagerView>
      <Text style={styles.paginationText}>{`${pageIndex + 1} / ${
        imgList.length
      }`}</Text>
    </View>
  );
};

const createStyles = (scaledSize: ScaledSize) => {
  return StyleSheet.create({
    container: {
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

export default LaunchImagePager;
