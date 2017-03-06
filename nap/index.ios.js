import React from 'react'
import { AppRegistry } from 'react-native'
import App from './app'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import NAPClient from './lib/NAPClient'

const nap = () => {
  const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
    opts: {
      credentials: 'same-origin'
    }
  })

  // Authen
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}  // Create the header object if needed.
      }

      // get the authentication token from local storage if it exists
      const token = process.browser ? NAPClient.sessionToken : null
      req.options.headers.authorization = token ? `Bearer ${token}` : null
      next()
    }
  }])

  const client = new ApolloClient({
    networkInterface
  })
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>)
}

AppRegistry.registerComponent('nap', () => nap)
