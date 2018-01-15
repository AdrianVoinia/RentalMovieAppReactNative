import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Linking, StatusBar, Picker, ScrollView } from 'react-native';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import * as firebase from "firebase"
import { VictoryAxis, VictoryBar, VictoryChart } from "victory-native";

export default class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: "",
      name: "",
      genre: "",
      data: [{"genre" : "Action", "number" : 0}, {"genre" : "SF", "number" : 0}, {"genre" : "Horror", "number" : 0},
             {"genre": "Comedy", "number": 0}, {"genre": "Drama", "number": 0}]
    };
    screen: Details
  }

  componentWillMount() {
    this.setState({name: this.props.navigation.state.params.name, 
                  genre: this.props.navigation.state.params.genre, 
                  key: this.props.navigation.state.params.key,
                  role: this.props.navigation.state.params.userRole })
  }

  componentDidMount() {
    this.computeStats()
  }  

  static navigationOptions = {
    title: 'Details',
  };

  async handlePress() {
    let ref = firebase.database().ref("/movies/" + this.state.key)
    ref.set({"Name" : this.state.name, "Genre" : this.state.genre})
    let currentToAdd = JSON.parse(await AsyncStorage.getItem("offlineAdd"))
    currentToAdd = currentToAdd === null ? [] : currentToAdd 
    currentToAdd.push({"Key" : this.state.key, "Movie" : {"Name" : this.state.name, "Genre" : this.state.genre}})
    AsyncStorage.setItem("offlineAdd", JSON.stringify(currentToAdd))
    const { navigate } = this.props.navigation;
    navigate('Main', {"name" : this.state.name, "genre" : this.state.genre})
  }

  async computeStats() {
    const data = {"Action" : 0, "SF" : 0, "Horror" : 0, "Comedy" : 0, "Drama" : 0}
    let ref = await firebase.database().ref("/movies").once('value')
    let ref2 = ref.val()     
    for (let x in ref2) 
    {
      data[ref2[x].Genre]++
    }
    console.log("Result", data)
    let result = Object.keys(data).map(function (key) { return {'genre' : key, "number" : data[key]}; });
    this.setState({data: result})
  }

  render() {
    console.log(this.state)
    return (
      <View>
      <ScrollView contentContainerStyle={styles.container}>
      <StatusBar hidden={true} />
      <FormLabel>Name</FormLabel>
      <FormInput value={this.state.name} onChangeText={name => this.setState({ name })}/>
      <FormLabel>Genre</FormLabel>
      <Picker style={{width: 100}} selectedValue={this.state.genre} onValueChange={(itemValue, itemIndex) => this.setState({genre: itemValue})}>
        <Picker.Item label="Action" value="Action" />
        <Picker.Item label="SF" value="SF" />
        <Picker.Item label="Horror" value="Horror" />
        <Picker.Item label="Comedy" value="Comedy" />
        <Picker.Item label="Drama" value="Drama" />
      </Picker>
      {
        this.state.role !== 'user' ? (<Button raised title="SAVE" onPress={() => {this.handlePress();}}></Button>) : null
      }
      <VictoryChart
        domainPadding={40}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={["Action", "SF", "Horror", "Comedy", "Drama"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => x}
        />
        <VictoryBar
          style={{
            data: {fill: "white"}
          }}
          data={this.state.data}
          x="genre"
          y="number"
        />
      </VictoryChart>
      </ScrollView>
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
