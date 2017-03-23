# nap-react-native
[WIP] React Native mobile boilerplate

# To develop server
Will run [NAP](https://github.com/rabbotio/nap) at `localhost:3000`
```shell
git pull https://github.com/rabbotio/nap.git
cd nap
npm run setup
npm run up
```

# To config server (required for Facebook login)
1. Go to your Facebook app page setting e.g. `https://developers.facebook.com/apps/`113587919136550`/settings/`
1. Add web platform with `http://localhost:3000/auth/facebook`
1. Follow through [Facebook Login for iOS - Quickstart](https://developers.facebook.com/docs/facebook-login/ios)
1. Copy app `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET` and fill them in `.env` file.
```
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
FACEBOOK_SCOPE=email,user_location
```

# To develop client
Will run `react-native` on simulator.
```shell
git pull https://github.com/rabbotio/nap-react-native.git
cd nap
npm run setup
npm run ios
```

# To create new project (experimental)
Will create new project with NAP authen, Please do make sure you have [React Native](https://facebook.github.io/react-native/docs/getting-started.html#getting-started) installed
```shell
YOUR_APP_NAME=foo YOUR_FACEBOOK_APP_ID=113587919136550 . builder.sh
```

# To upgrade
```shell
react-native upgrade

# Relink after upgrade
react-native link react-native-fbsdk
react-native link react-native-device-info
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

# TODO
- [ ] Automate som e remain process
- [ ] Android support
- [ ] Test
