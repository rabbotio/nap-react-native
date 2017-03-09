import NAPApp from './lib/NAPApp'
import { AsyncStorage } from 'react-native'
(async () => {
  //const reduxState = await AsyncStorage.getItem('reduxState')
  // TODO : keep in redux?
  const sessionToken = await AsyncStorage.getItem('sessionToken')
  const nap = new NAPApp({
    uri: 'http://localhost:3000/graphql',
    //reduxState,
    sessionToken,
  })
})()

