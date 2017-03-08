import React from 'react'
import { AppRegistry } from 'react-native'
import App from '../app'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import NAPClient from './NAPClient'
import Installation from './Installation'

const NAPApp = (options) => {
  // Default 
  options.opts = options.opts || { credentials: 'same-origin' }

  // Our app
  const nap = () => {

    const networkInterface = createNetworkInterface(options)

    // Authen
    /*
    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}  // Create the header object if needed.
        }

        NAPClient.getSessionToken().then(sessionToken => {
          // get the authentication token from local storage if it exists
          const token = process.browser ? sessionToken : null
          req.options.headers.authorization = token ? `Bearer ${token}` : null
          alert(token)
          next()
        }, () => {
          next()
        })
      }
    }])*/

    const client = new ApolloClient({
      networkInterface
    })

    return (
      <ApolloProvider client={client}>
        <App device={NAPClient.info}/>
      </ApolloProvider>)
  }
  AppRegistry.registerComponent('nap', () => nap)
}

export default NAPApp