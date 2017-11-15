import React from 'react';
import { StyleSheet, Text, View, Linking, StatusBar } from 'react-native';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'

export default class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: ""
    };
    screen: Details
  }

  componentWillMount() {
    this.setState({name: this.props.navigation.state.params.name, genre: this.props.navigation.state.params.genre })
  }

  static navigationOptions = {
    title: 'Details',
  };

  handlePress() {
    const { navigate } = this.props.navigation;
    navigate('Main', {"name" : this.state.name, "genre" : this.state.genre})
  }

  render() {    
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={{color: 'black'}}>Name</Text>
      <FormInput value={this.state.name} style={{color: ''}}/>
      <Text style={{color:'black'}}>Genre</Text>
      <FormInput value={this.state.genre} onChangeText={(genre) => this.setState({genre})}/>
      <Button raised title="SAVE" onPress={() => {this.handlePress();}}></Button>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDAB9',
    alignItems: 'center',
  },
});
