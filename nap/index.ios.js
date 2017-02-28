import React from 'react'
import { AppRegistry } from 'react-native'
import App from './app'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const nap = () => {
  const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql'
  })
  const client = new ApolloClient({
    networkInterface
  })
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>)
}

AppRegistry.registerComponent('nap', () => nap)
