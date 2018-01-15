import React from 'react';
import { StyleSheet, Text, View, Linking, StatusBar, Picker, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import * as firebase from "firebase"

export default class AddMovie extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Genre: "Action"
    };
    screen: AddMovie
    this.ref = firebase.database().ref("/movies");
  }

  componentWillMount() {
  }

  static navigationOptions = {
    title: 'Add Movie',
  };

  handleAdd() {
    this.ref.push(this.state)
    const { navigate } = this.props.navigation
    navigate('Main', {"entityAdd" : this.state})
  }

  render() {    
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
      <FormLabel>Name</FormLabel>
      <FormInput ref= {(el) => { this.Name = el; }} onChangeText={(Name) => this.setState({Name})} value={this.state.Name}/>
      <FormLabel>Genre</FormLabel>
      <Picker style={{width: 100}} selectedValue={this.state.Genre} onValueChange={(itemValue, itemIndex) => this.setState({Genre: itemValue})}>
        <Picker.Item label="Action" value="Action" />
        <Picker.Item label="SF" value="SF" />
        <Picker.Item label="Horror" value="Horror" />
        <Picker.Item label="Comedy" value="Comedy" />
        <Picker.Item label="Drama" value="Drama" />
      </Picker>
      <Button title="Add" onPress={() => {this.handleAdd()}}></Button>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A90B0B',
    alignItems: 'center',
  },
});
