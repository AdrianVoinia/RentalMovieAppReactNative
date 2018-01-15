import React from 'react'
import { StyleSheet, Text, View, Linking, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import Main from "./components/Main.js"
import Details from "./components/Details.js"
import LoginForm from "./components/LoginForm.js"
import AddMovie from "./components/AddMovie.js"
import * as firebase from 'firebase';
import { AppRegistry } from 'react-native';

export default class App extends React.Component {
 
  static navigationOptions = {
    title: 'Details',
  };
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainScreenNavigator/>
      </View>
    );
  }
}

const MainScreenNavigator = StackNavigator({
  LoginForm: { screen: LoginForm },
  Main: { screen: Main }, 
  Details: { screen: Details },
  AddMovie: {screen: AddMovie},
});
