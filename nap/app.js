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
import UserProfile from './components/UserProfile'

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
      accessToken: ''
    }
  }

  shareLinkWithShareDialog() {
    var tmp = this
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function (canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent)
        }
      }
    ).then(
      function (result) {
        if (result.isCancelled) {
          alert('Share cancelled')
        } else {
          alert('Share success with postId: '
            + result.postId)
        }
      },
      function (error) {
        alert('Share fail with error: ' + error)
      }
      )
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
          const accessToken = data.accessToken.toString()
          this.setState({ accessToken, isLoggedIn: true })
        }
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.accessToken}</Text>
        <UserProfile accessToken={this.state.accessToken}/>
        <LoginButton
          publishPermissions={["email"]}
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