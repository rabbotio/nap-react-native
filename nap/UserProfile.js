import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import React, { Component } from 'react'
import {
  Text,
} from 'react-native'

import NAPClient from './lib/NAPClient'

class UserProfile extends Component {
  render() {
    const info = {
      // Devices
      deviceInfo: "bar",
    }

    // At client
    if (this.state && this.state.sessionToken) {
      return <Text>{this.state.sessionToken}</Text>
    }

    if (typeof (window) !== 'undefined') {
      this.props.mutate(info).then(result => {

        const sessionToken = result.data.loginWithFacebook.sessionToken

        // Persist
        NAPClient.setSessionToken(sessionToken).then(() => {
          alert(sessionToken)
        }, error => {
          alert(error)
        })

        // View
        this.setState({ sessionToken })

      }, error => {
        alert(error)
      }).catch(err => {
        alert(err)
      })
    }

    return <Text>hmm?</Text>
  }
}

const withUserProfile = gql`
mutation {
  loginWithFacebook(deviceInfo: "bar", accessToken: "EAABnTrZBSJyYBAKvcWAcAOUwt07ZCVxhCYQwKKWFZAwtOhsGYZAc7olL04W8eJTlxBeZCmxCQO9kYZA4kKtTD0zmZChhb5hEoZBl7JHT0Rx39uGP8ow2X9vGoTLFZCm4Dd0NFvH0qsHXNYinsOKjszfSJVOj3DZChv0MNszawr1le8O0ToqI3Ak9Jr8X3X6imEtvJ2q8ceeVh5Ux1rSbgypRQNRDjlredVXpIZD") {
    sessionToken
    user {
      name
    }
  }
}`

export default compose(graphql(withUserProfile/*, {
  props: ({ mutate }) => ({
    init: info => mutate({
      variables: { info },
    })
  })
}*/)(UserProfile))
