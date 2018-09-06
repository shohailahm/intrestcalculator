import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import ListPage from './src/Components/ListPage'
export default class App extends React.Component {
  render() {
    return (
  
      <View style={{flex:1}}>
            <StatusBar
      backgroundColor="black"
      barStyle="light-content" />
  <View style={styles.container}>
  <ListPage/>
  </View>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#000'
  },
});
