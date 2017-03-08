import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import React, { Component } from 'react'
import {
  Text,
} from 'react-native'

import NAPClient from './NAPClient'

class UserProfile extends Component {
  render() {
    // At client
    if (this.state && this.state.sessionToken) {
      return <Text>{this.state.sessionToken}</Text>
    }

    if (typeof (window) !== 'undefined') {
      this.props.mutate({
        variables: {
          deviceInfo: "foo",
          accessToken: "EAABnTrZBSJyYBAKvcWAcAOUwt07ZCVxhCYQwKKWFZAwtOhsGYZAc7olL04W8eJTlxBeZCmxCQO9kYZA4kKtTD0zmZChhb5hEoZBl7JHT0Rx39uGP8ow2X9vGoTLFZCm4Dd0NFvH0qsHXNYinsOKjszfSJVOj3DZChv0MNszawr1le8O0ToqI3Ak9Jr8X3X6imEtvJ2q8ceeVh5Ux1rSbgypRQNRDjlredVXpIZD"
        }
      }).then(result => {

        const sessionToken = result.data.loginWithFacebook.sessionToken

        // Persist
        NAPClient.willSetSessionToken(sessionToken)

        // View
        this.setState({ sessionToken })
      })
    }

    return <Text>hmm?</Text>
  }
}

const withData = gql`
mutation loginWithFacebook($deviceInfo: String, $accessToken: String!) {
  loginWithFacebook(deviceInfo: $deviceInfo, accessToken: $accessToken) {
    user {
      name
    }
  }
}
`

export default graphql(withData)(UserProfile)
