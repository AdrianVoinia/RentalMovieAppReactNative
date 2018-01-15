import React from 'react';
import { StyleSheet, Text, View, Linking, StatusBar, Alert, AsyncStorage, NetInfo, TextInput } from 'react-native';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements'
import { Details } from './Details'
import { StackNavigator } from 'react-navigation'
import * as firebase from "firebase";
import LoginForm from './LoginForm';

var config = {
  apiKey: "AIzaSyAVpa87IFC18L3oNK9vSgtxv8ZoVXwi4O0",
  authDomain: "rentalapp-3bfff.firebaseapp.com",
  databaseURL: "https://rentalapp-3bfff.firebaseio.com",
  projectId: "rentalapp-3bfff",
  storageBucket: "rentalapp-3bfff.appspot.com",
  messagingSenderId: "1049133672758"
};
firebase.initializeApp(config);

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      emailTo: "",
      list : [],
      authUser : {
        email: '',
        role: 'user', 
      },
    };
    this.ref = firebase.database().ref("/movies");
    screen: Main;
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  static navigationOptions = {
    title: 'Main',
  };

  sendEmail() {
    if (this.state.emailTo === "") {
      Alert.alert("Cannot have empty email!")
    }
    else {
      let emailUrl = "mailto:?to=" + this.state.emailTo
      Linking.openURL(emailUrl)
    }
  }

  handleAdd() {
    const { navigate } = this.props.navigation;
    navigate('AddMovie')
  }

  componentWillMount() {
    if (this.props.navigation.state.params)
    {
      var name = this.props.navigation.state.params.name;
      var genre = this.props.navigation.state.params.genre;
      var list = this.state.list;
      for (var i = 0; i < list.length; i++) {
        if (name == list[i].name) {
          list[i].genre = genre;
        }
      }
      this.setState({list});

      let userEmail = this.props.navigation.state.params.user_email;  
      let userRole = 'user';
      firebase.database().ref("/users").once('value').then((data) => {
        let users = data.val()
        console.log(users)
        for(let x in users) {
          if (users[x].email === userEmail) {
            userRole = users[x].role
            this.setState({authUser: {
              'email' : userEmail,
              'role' : userRole,
            }})
          }
        }
      })
    }
  }

  async componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleFirstConnectivityChange);
   }
  
  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
  }

   handleFirstConnectivityChange = async (isConnected) =>{
    //  if(isConnected){
    //  console.log("ON")
    //  const offAdd = JSON.parse(await AsyncStorage.getItem("offlineAdd"))
    //  console.log(offAdd)
    //  if (offAdd) {
    //   for (var x in offAdd) {
    //     this.ref.child(offAdd[x]['Key']).set(offAdd[x]['Movie']) 
    //   }
    //     AsyncStorage.removeItem("offlineAdd")
    //   }

    //   const offRem =JSON.parse(await AsyncStorage.getItem("offlineRemove"))
    //   if (offRem) {
    //     for (var x in offRem) {
    //       this.ref.child(offRem[x]["Key"]).remove()
    //     }
    //     AsyncStorage.removeItem("offlineRemove")
    //   }
      let list = this.ref.once('value').then((data) => {
        data = data.val()
        data2 = Object.keys(data).map(function (key) { return {'Movie' : data[key], "Key" : key}; });
        console.log("Rec from firebase", data2)
        this.setState({list: data2})
        AsyncStorage.setItem("list", JSON.stringify(data2))
      })
   }
  //  else {
  //   console.log("OFF")
  //   let list = JSON.parse(AsyncStorage.getItem("list"))
  //   this.setState({list: list})
  //   if (this.props.navigation.state.params !== undefined && this.props.navigation.state.params.entityAdd !== undefined) {
  //     let currentToAdd = JSON.parse(AsyncStorage.getItem("offlineAdd"))
  //     if (!currentToAdd) {
  //       currentToAdd = []
  //     }
  //     const genKey = this.generateKey()
  //     currentToAdd.push({"Key" : genKey, "Movie" : this.props.navigation.state.params.entityAdd})
  //     AsyncStorage.setItem("offlineAdd", JSON.stringify(currentToAdd))
  //     currentList = this.state.list
  //     currentList.push({"Key" : genKey, 'Movie' : this.props.navigation.state.params.entityAdd })
  //     this.setState({list : currentList})
  //     }
  //   }
  // }

  handleListItemPress(name, genre, key) {
    const { navigate } = this.props.navigation;
    navigate('Details', {"name" : name, "genre" : genre, "key" : key, "userRole" : this.state.authUser.role})
  }

  setPosition(name,genre) {
    list = this.state.list;
    for (var i = 0; i < list.length; i++) {
      if (name == list[i].name) {
        list[i].genre = genre;
      }
    }
  }

  async acceptDelete(l, idx) {
    //NetInfo.isConnected.addEventListener('connectionChange', this.handleDelete);
    let deleteUrl = this.ref.child(l.Key)
    deleteUrl.remove()
    let list = this.state.list
    list.splice(idx, 1)
    this.setState({list})
  }

  handleDelete = (isConnected) =>{
      // if ( isConnected )
      // {
        // let deleteUrl = this.ref.child(l.Key)
        // deleteUrl.remove()
        // let list = this.state.list
        // list.splice(idx, 1)
        // this.setState({list})
      // }
      // else
      // {
      //   let offlineRemove = JSON.parse(AsyncStorage.getItem("offlineRemove"))
      //   if (!offlineRemove) {
      //     offlineRemove = []
      //   }
      //   offlineRemove.push(l)
      //   let list = this.state.list
      //   list.splice(idx, 1)
      //   AsyncStorage.setItem("list", JSON.stringify(list))
      //   AsyncStorage.setItem("offlineRemove", JSON.stringify(offlineRemove))
      //   this.setState({list})
      // }
  }

  async handleLongPress(l, idx) {
    let value = await AsyncStorage.getItem("list");
    Alert.alert(
      'Delete ' + l.Movie.Name,
      'Are you sure you want to delete this movie?',
      [
      {text: 'Yes', onPress: () => this.acceptDelete(l, idx)},
      {text: 'No', style: 'cancel'},
      ],
      { cancelable: false }
      )
  }

  render() {
    let list = this.state.list;
    console.log(this.state.authUser)
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
      <FormLabel>Name</FormLabel>
      <FormInput ref= {(el) => { this.emailTo = el; }} onChangeText={(emailTo) => this.setState({emailTo})} value={this.state.emailTo}/>
      <Button title="SEND EMAIL" raised onPress={() => this.sendEmail()}></Button>
      <List containerStyle={{width: 300}}>
      {
        list === undefined ? "" : list.map((l, i) => (
          <ListItem
          key={l.Key}
          title={l.Movie.Name}
          onPress={() => {this.handleListItemPress(l.Movie.Name, l.Movie.Genre, l.Key)}}
          onLongPress={() => {this.handleLongPress(l, i)}}
          />
          ))
      }
      </List>
      {this.state.authUser.role !== "user" ? (
        <Button title="Add" raised onPress={() => this.handleAdd()}></Button>
      ) : null}
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
