import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { AppRegistry, AsyncStorage } from 'react-native'
import App from '../app'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import NAPClient from './NAPClient'

const NAPApp = (options) => {
  // Default 
  options.opts = options.opts || { credentials: 'same-origin' }

  // Our app
  const nap = () => {

    const networkInterface = createNetworkInterface(options)

    const client = new ApolloClient({
      networkInterface,
      dataIdFromObject: r => r.id,
    })

    // Persist
    const reduxState = options.reduxState 
    const persistedState = reduxState ? JSON.parse(reduxState) : {}

    // Store
    const store = createStore(
      combineReducers({
        // Other reducer
        apollo: client.reducer(),
      }),
      persistedState, // initial state
      compose(
        applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
      )
    )

    // Watcher
    store.subscribe(() => {
      AsyncStorage.setItem('reduxState', JSON.stringify(store.getState()))
    })

    // Authen
    networkInterface.use([{
      applyMiddleware(req, next) {
        
        // SSR
        if (!process.browser) return

        // No session
        if (!sessionToken) {
          next()
          return
        }

        // get the authentication token from local storage if it exists
        req.options.headers = req.options.headers || {}
        req.options.headers.authorization = `Bearer ${sessionToken}`
        next()
      }
    }])

    return (
      <ApolloProvider store={store} client={client}>
        <App />
      </ApolloProvider>)
  }

  AppRegistry.registerComponent('nap', () => nap)
}

export default NAPApp