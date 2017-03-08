import gql from 'graphql-tag'
import { compose, graphql, withApollo } from 'react-apollo'
import React, { Component } from 'react'
import {
  Text,
} from 'react-native'

import NAPClient from './NAPClient'

const UserProfile = ({ loginWithFacebook }) => {
  return <Text>hmm</Text>
}

UserProfile.propTypes = {
  loginWithFacebook: React.PropTypes.func.isRequired
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

export default compose(graphql(withData, {
  props: ({ mutate }) => ({
    loginWithFacebook: (deviceInfo, accessToken) => mutate({
      variables: {
        deviceInfo: "react native",
        accessToken: "EAABnTrZBSJyYBAKvcWAcAOUwt07ZCVxhCYQwKKWFZAwtOhsGYZAc7olL04W8eJTlxBeZCmxCQO9kYZA4kKtTD0zmZChhb5hEoZBl7JHT0Rx39uGP8ow2X9vGoTLFZCm4Dd0NFvH0qsHXNYinsOKjszfSJVOj3DZChv0MNszawr1le8O0ToqI3Ak9Jr8X3X6imEtvJ2q8ceeVh5Ux1rSbgypRQNRDjlredVXpIZD"
      },
    })
  })
})(Installation))
