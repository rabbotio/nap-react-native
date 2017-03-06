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

import Installation from './Installation'

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
          const access_token = data.accessToken.toString()
          console.log('access_token :', access_token)

          // TODO : Secure header?
          access_token && fetch(`http://localhost:3000/auth/facebook/token`,
            {
              method: 'post',
              headers: {
                'Authorization': `Bearer ${access_token}`
              }
            }
          ).then((response) => {
            if (response.status >= 400) {
              throw new Error("Bad response from server")
            }
            return response.text()
          }).then((text) => {
            console.log(text)
            this.setState({ isLoggedIn: true })
          })
        }
      )
    }
  }

  render() {

    const query = gql`{
      userOne {
        name
      }
    }`

    const UserProfile = ({ data }) => this.state.isLoggedIn ?
      <View style={{ paddingLeft: 20, paddingTop: 20 }}>
        <Text>{data.userOne && data.userOne.name}</Text>
      </View>
      :
      <View style={{ paddingLeft: 20, paddingTop: 20 }}>
        <Text>Please log in</Text>
      </View>

    const ViewWithData = graphql(query, {
      options: { variables: { name: this.state.name } }
    })(UserProfile)

    return (
      <View style={styles.container}>
        <Installation/>
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