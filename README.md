# nap-react-native
[WIP] React Native mobile boilerplate

# To develop server
Will run [NAP](https://github.com/rabbotio/nap) at`localhost:3000`
```shell
git pull https://github.com/rabbotio/nap.git
cd nap
npm run up
```

# To develop client
Will run`react-native` on simulator.
```shell
git pull https://github.com/rabbotio/nap-react-native.git
cd nap
npm run setup
npm run ios
```

# To create new project
Will create new project with NAP authen, Please do make sure you have [React Native](https://facebook.github.io/react-native/docs/getting-started.html#getting-started) installed
```shell
YOUR_APP_NAME=foo YOUR_FACEBOOK_APP_ID=113587919136550 . builder.sh
```
# To config
Edit `index.ios.js` to match your need.
```js
import NAPApp from './components/NAPApp'

const nap = new NAPApp({
  name: 'foo',                          // Change name to match your app
  uri: 'http://localhost:3000/graphql'  // Change GraphQL endpoint here
})
```

# To upgrade
```
react-native upgrade
```

TODO
- [ ] Android support
- [ ] Test
