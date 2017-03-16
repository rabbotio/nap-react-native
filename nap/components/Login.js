import React from 'react'
import { gql, graphql } from 'react-apollo'
import persist from '../lib/persist'
import device from '../lib/device'

import {
  View,
  Button,
  TextTextInput,
} from 'react-native'

const Login = ({ loginWithFacebook }) => {

  const deviceInfo = device.info()
  const accessToken = "EAABnTrZBSJyYBAKvcWAcAOUwt07ZCVxhCYQwKKWFZAwtOhsGYZAc7olL04W8eJTlxBeZCmxCQO9kYZA4kKtTD0zmZChhb5hEoZBl7JHT0Rx39uGP8ow2X9vGoTLFZCm4Dd0NFvH0qsHXNYinsOKjszfSJVOj3DZChv0MNszawr1le8O0ToqI3Ak9Jr8X3X6imEtvJ2q8ceeVh5Ux1rSbgypRQNRDjlredVXpIZD"
  loginWithFacebook(deviceInfo, accessToken)

  return (
    <Text>...</Text>
  )
}

const loginWithFacebook = gql`
mutation loginWithFacebook($deviceInfo: String!, $accessToken: String!) {
  loginWithFacebook(deviceInfo: $deviceInfo, accessToken: $accessToken) {
    sessionToken
    user {
      _id
      name
    }
  }
  errors {
    code
    message
  }
}
`

Login.propTypes = () => ({
  loginWithFacebook: React.PropTypes.func.isRequired
})

export default graphql(loginWithFacebook, {
  props: ({ mutate }) => ({
    loginWithFacebook: (deviceInfo, accessToken) => mutate({
      variables: { deviceInfo, accessToken },
      updateQueries: {
        userProfile: (previousResult, { mutationResult }) => {
          // Keep session
          persist.willSetSessionToken(mutationResult.data.loginWithFacebook.sessionToken)
          alert(mutationResult.data.loginWithFacebook.sessionToken)

          // Provide user
          return mutationResult.data.loginWithFacebook
        }
      }
    })
  })
})(Login)
