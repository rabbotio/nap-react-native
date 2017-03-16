import React from 'react'
import { gql, graphql } from 'react-apollo'
import persist from '../lib/persist'
import device from '../lib/device'

import {
  View,
  Button,
  Text,
} from 'react-native'

const Login = ({ loginWithFacebook, accessToken }) => {

  const deviceInfo = device.info()
  if (!accessToken || accessToken === '') {
    return <Text>No accessToken</Text>
  }

  loginWithFacebook(deviceInfo, accessToken)

  return <Text>sign in with : {accessToken}</Text>
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
  loginWithFacebook: React.PropTypes.func.isRequired,
  accessToken: React.PropTypes.string.isRequired,
})

export default graphql(loginWithFacebook, {
  props: ({ mutate }) => ({
    loginWithFacebook: (deviceInfo, accessToken) => mutate({
      variables: { deviceInfo, accessToken },
      updateQueries: {
        userProfile: (previousResult, { mutationResult }) => {
          // Keep session
          persist.willSetSessionToken(mutationResult.data.loginWithFacebook.sessionToken)

          // Provide user
          return mutationResult.data.loginWithFacebook
        }
      }
    })
  })
})(Login)
