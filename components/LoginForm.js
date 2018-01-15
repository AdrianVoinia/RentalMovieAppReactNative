import React, { Component } from 'react';
import {StyleSheet, View, Button, TextInput, Switch, Text, Alert, Image } from 'react-native';
import * as firebase from "firebase";

export default class LoginForm extends Component {
    
    state = { email: '', password: '', error: '', loading: false, name: '', role: '', switchValue: false }

    constructor(props) {
        super(props)
        screen: LoginForm    
        this.ref = firebase.database().ref("/users");
    }

    onLoginPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { 
                this.setState({ error: '', loading: false })
                const { navigate } = this.props.navigation;
                navigate('Main', {'user_email' : email})
            })
            .catch(() => {
                this.setState({ error: 'Authentication failed on login.', loading: false });
                Alert.alert('Log in failed!');
            });
    }

    onSignupPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { 
                let role = this.state.switchValue === false ? "user" : "admin"
                this.setState({ error: '', loading: false, role: role })
                this.ref.push({'name' : this.state.name, 'role' : role, 'email' : this.state.email })
                const { navigate } = this.props.navigation;
                navigate('Main', {'user_email' : email})
            })
            .catch(() => {
                this.setState({ error: 'Register failed.', loading: false });
                Alert.alert(this.state.error);
        });
    }

    switchToggle() {
        console.log
    }

    render() {
        return (
            <View style={styles.container}>
                <Image 
                    style={{width: 200, height: 100}}
                    source={{uri:'https://thumb1.shutterstock.com/display_pic_with_logo/1195679/137027423/stock-photo-movie-rentals-neon-sign-137027423.jpg'}}
                />
                    <TextInput 
                        style={{ flex: 1 }}
                        label='Email Address'
                        placeholder='you@domain.com'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput 
                        style={{ flex: 1 }}
                        label='Password'
                        autoCorrect={false}
                        placeholder='*******'
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                    <TextInput 
                        style={{ flex: 1 }}
                        label='Name'
                        placeholder='Name'
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                    />
                    <Text style={{ flex: 1 }}>Is Admin:</Text>
                    <Switch
                        style={{ flex: 1 }}
                        value={this.state.switchValue}
                        onValueChange={() => {
                            let val = !this.state.switchValue
                            this.setState({switchValue: val})}
                        }
                    />
                    <Button title="Log in" 
                        style={{ flex: 1 }}
                        onPress={() => {this.onLoginPress()}}
                    />
                    <Button title="Sign Up"
                        style={{ flex: 1 }} 
                        onPress={() => {this.onSignupPress()}}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4E5AE9',
      alignItems: 'center',
    },
  });