/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

const FBSDK = require('react-native-fbsdk');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
const {
  LoginButton,
  ShareDialog,
  AccessToken,
} = FBSDK;

export default class nap extends Component {
  constructor(props) {
    super(props);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://www.facebook.com/',
    };

    this.state = {
      shareLinkContent: shareLinkContent,
    };
  }

  shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function (canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function (result) {
        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Share success with postId: '
            + result.postId);
        }
      },
      function (error) {
        alert('Share fail with error: ' + error);
      }
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
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
                        throw new Error("Bad response from server");
                      }
                      return response.text();
                    }).then((text) => {
                      console.log(text);
                    })
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")} />
        <TouchableHighlight style={styles.share}
          onPress={this.shareLinkWithShareDialog.bind(this)}>
          <Text style={styles.shareText}>Share link with ShareDialog</Text>
        </TouchableHighlight>
      </View>
    );
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
});

AppRegistry.registerComponent('nap', () => nap);
