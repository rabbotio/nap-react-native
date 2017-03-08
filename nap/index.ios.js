import NAPApp from './lib/NAPApp'
import { AsyncStorage } from 'react-native'
(async () => {
  const reduxState = await AsyncStorage.getItem('reduxState')
  const nap = new NAPApp({
    uri: 'http://localhost:3000/graphql',
    reduxState
  })
})()

