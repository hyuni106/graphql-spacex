import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export enum ScreenName {
  MainScreen = 'MainScreen',
}

export type StackParamList = {
  [ScreenName.MainScreen]: undefined;
};

export type Props<S extends keyof StackParamList> = {
  route: RouteProp<StackParamList, S>;
  navigation: StackNavigationProp<StackParamList, S>;
};
