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

  const info = device.info()
  if (!accessToken || accessToken === '') {
    return <Text>No accessToken</Text>
  }

  loginWithFacebook(info.deviceInfo, accessToken, info.locale, info.country, info.timezone, info.deviceName)

  return <Text>sign in with : {accessToken}</Text>
}

const loginWithFacebook = gql`
mutation loginWithFacebook($deviceInfo: String!, $accessToken: String!, $locale: String, $country: String, $timezone: String, $deviceName: String) {
  loginWithFacebook(deviceInfo: $deviceInfo, accessToken: $accessToken, locale: $locale, country: $country, timezone: $timezone, deviceName: $deviceName) {
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
    loginWithFacebook: (deviceInfo, accessToken, locale, country, timezone, deviceName) => mutate({
      variables: { deviceInfo, accessToken, locale, country, timezone, deviceName },
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
