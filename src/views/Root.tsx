import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import Navigation from './Navigation';
import {Colors} from 'styles';

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/graphql',
  cache: new InMemoryCache(),
});

const Root = (): React.ReactElement => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default Root;
