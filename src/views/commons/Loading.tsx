import React, {useMemo} from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
  useWindowDimensions,
  ScaledSize,
} from 'react-native';
import LottieView from 'lottie-react-native';

import loading from 'assets/json/loading.json';

interface LoadingProps {
  style?: StyleProp<ViewStyle>;
}

const Loading = (props: LoadingProps): React.ReactElement => {
  const window = useWindowDimensions();
  const styles = useMemo(() => createStyles(window), [window]);

  const {style} = props;

  return (
    <View style={[styles.root, style]}>
      <LottieView style={styles.loadingImage} source={loading} autoPlay loop />
    </View>
  );
};

const createStyles = (scaledSize: ScaledSize) => {
  return StyleSheet.create({
    root: {
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: scaledSize.width,
      height: scaledSize.height,
      backgroundColor: 'rgba(32, 32, 33, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingImage: {
      width: 200,
      height: 200,
    },
  });
};

export default Loading;
