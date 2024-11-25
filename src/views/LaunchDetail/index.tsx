import React from 'react';
import {View, StyleSheet} from 'react-native';

import {ScreenName, Props} from 'views';
import {Colors} from 'styles';

export interface LaunchDetailScreenProps {
  launchId: string;
}

const LaunchDetailScreen = ({
  route,
}: Props<ScreenName.LaunchDetailScreen>): React.ReactElement => {
  const {launchId} = route.params;

  return <View style={styles.root}></View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
});

export default LaunchDetailScreen;
