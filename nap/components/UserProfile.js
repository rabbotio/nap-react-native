import { gql, graphql } from 'react-apollo'
import React from 'react'
import Login from './Login'
import Logout from './Logout'

import {
  View,
  Text,
} from 'react-native'

const UserProfile = ({ loading, user, errors }) => {

  if (errors && errors.length > 0) {
    console.log(JSON.stringify(errors)) // eslint-disable-line
  }

  if (loading) {
    return <Text>Loading</Text>
  }

  if (user) {
    return <Text>Welcome : {user.name}<Logout/></Text>
  }

  return <View><Login/></View>
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
