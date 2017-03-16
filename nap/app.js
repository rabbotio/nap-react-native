const FBSDK = require('react-native-fbsdk')

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
const {
  LoginButton,
  ShareDialog,
  AccessToken,
} = FBSDK

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
//import UserProfile from './components/UserProfile'
import persist from './lib/persist'
import device from './lib/device'

export default class nap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      name: ''
    }
  }

  onLoginFinished(error, result) {
    if (error) {
      alert("login has error: " + result.error)
    } else if (result.isCancelled) {
      alert("login is cancelled.")
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          const access_token = data.accessToken.toString()
          this.setState({
            ...this.state,
            accessToken
          })
        }
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.accessToken}</Text>
        <LoginButton
          onLoginFinished={this.onLoginFinished.bind(this)}
          onLogoutFinished={() => this.setState({ isLoggedIn: false })} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  shareText: {
    fontSize: 20,
    margin: 10,
  },
})