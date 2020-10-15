import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
      <View style={styles.root}>
        <Text>{'hello, react-native-web'}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    root: {
        height: '100vh',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
