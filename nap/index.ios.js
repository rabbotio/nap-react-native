import NAPApp from './components/NAPApp'
import persist from './lib/persist'

(async () => {
  const sessionToken = await persist.getItem('sessionToken')
  const nap = new NAPApp({
    uri: 'http://localhost:3000/graphql',
    //reduxState,
    sessionToken,
  })
})()

