import React from 'react';
import { StyleSheet, Text, View, Linking, StatusBar, Alert } from 'react-native';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements'
import { Details } from './Details'
import { StackNavigator } from 'react-navigation'

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      emailTo: "",
      list : [
      {
        name: 'The Lord of the Rings',
        avatar_url: 'https://images.susu.org/unionfilms/films/posters/xlarge/the-lord-of-the-rings-the-return-of-the-king.jpg',
        genre: 'Action'
      },
      {
        name: 'Avatar',
        avatar_url: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg',
        genre: "SF"
      },
      ]
    };
    screen: Main;
  }

  static navigationOptions = {
    title: 'Main',
  };

  sendEmail() {
    if (this.state.emailTo === "") {
      Alert.alert("Can not have empty email!")
    }
    else {
      let emailUrl = "mailto:?to=" + this.state.emailTo
      console.log(emailUrl)
      Linking.openURL(emailUrl)
    }
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
    }
  }

  handleListItemPress(name, genre) {
    const { navigate } = this.props.navigation;
    navigate('Details', {"name" : name, "genre" : genre})
  }

  setGenre(name,genre) {
    console.log(name,genre)
    list = this.state.list;
    for (var i = 0; i < list.length; i++) {
      // console.log(name,list[i].name)
      if (name == list[i].name) {
        list[i].genre = genre;
      }
    }
    // console.log(list)
  }

  render() {
    // console.log(this.props)    
    let list = this.state.list;
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={{color: "#000000"}}>Email to: </Text>
      <FormInput ref= {(el) => { this.emailTo = el; }} onChangeText={(emailTo) => this.setState({emailTo})} value={this.state.emailTo}/>
    <Button title="SEND EMAIL" raised onPress={() => this.sendEmail()}></Button>


    <List containerStyle={{width: 300}}>
    {
      list.map((l, i) => (
      <ListItem
      roundAvatar
      avatar={{uri:l.avatar_url}}
      key={i}
      title={l.name}
      onPress={() => {this.handleListItemPress(l.name, l.genre)}}
      />
      ))
}
</List>
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
