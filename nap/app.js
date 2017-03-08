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
import UserProfile from './UserProfile'

export default class nap extends Component {
  constructor(props) {
    super(props)
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://www.facebook.com/',
    }

    this.state = {
      shareLinkContent: shareLinkContent,
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
          // TODO : Handle bad token
          const access_token = data.accessToken.toString()
          console.log('access_token :', access_token)

          // TODO : Change state
        }
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <UserProfile />
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