import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {LaunchDetailScreenProps} from './LaunchDetail';

export enum ScreenName {
  MainScreen = 'MainScreen',
  LaunchDetailScreen = 'LaunchDetailScreen',
}

export type StackParamList = {
  [ScreenName.MainScreen]: undefined;
  [ScreenName.LaunchDetailScreen]: LaunchDetailScreenProps;
};

export type Props<S extends keyof StackParamList> = {
  route: RouteProp<StackParamList, S>;
  navigation: StackNavigationProp<StackParamList, S>;
};
