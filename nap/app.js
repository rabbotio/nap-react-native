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

    const UserProfile = ({ data }) => this.state.isLoggedIn ?
      <View style={{ paddingLeft: 20, paddingTop: 20 }}>
        <Text>{data.user && data.user.name}</Text>
      </View>
      :
      <View style={{ paddingLeft: 20, paddingTop: 20 }}>
        <Text>Please log in</Text>
      </View>

    const ViewWithData = graphql(gql`
    mutation {
      loginWithFacebook(deviceInfo: "bar", accessToken: "EAABnTrZBSJyYBAKvcWAcAOUwt07ZCVxhCYQwKKWFZAwtOhsGYZAc7olL04W8eJTlxBeZCmxCQO9kYZA4kKtTD0zmZChhb5hEoZBl7JHT0Rx39uGP8ow2X9vGoTLFZCm4Dd0NFvH0qsHXNYinsOKjszfSJVOj3DZChv0MNszawr1le8O0ToqI3Ak9Jr8X3X6imEtvJ2q8ceeVh5Ux1rSbgypRQNRDjlredVXpIZD") {
        user {
          name
        }
      }
    }`)(UserProfile)

    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={this.onLoginFinished.bind(this)}
          onLogoutFinished={() => this.setState({ isLoggedIn: false })} />
        <ViewWithData />
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