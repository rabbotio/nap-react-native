import { gql, graphql } from 'react-apollo'
import React from 'react'
import Login from './Login'
import Logout from './Logout'

import {
  View,
  Text,
} from 'react-native'

const UserProfile = ({ loading, user, errors, accessToken }) => {

  if (errors && errors.length > 0) {
    console.log(JSON.stringify(errors)) // eslint-disable-line
  }

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (user) {
    return <View>
      <Text>Welcome : {user.name}</Text>
      <Logout />
    </View>
  }

  return <View>
    <Text>Hm?</Text>
    <Text>UserProfile : {accessToken}</Text>
    <Login accessToken={accessToken} />
  </View>
}

const userProfile = gql`
query userProfile {
  user {
    name
  }
  errors {
    code
    message
  }
}
`

export default graphql(userProfile, {
  options: { fetchPolicy: 'cache-and-network' },
  props: ({ data: { loading, user, errors } }) => (
    { loading, user, errors }
  ),
})(UserProfile)
