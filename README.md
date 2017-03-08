# nap-react-native
[WIP] React Native mobile boilerplate

# Setup
```shell
npm run setup
```

# To try
> Run [NAP](https://github.com/rabbotio/nap) at localhost:3000 and then
> Run client on simulator.
```shell
react-native run-ios
```

# To create new project
```shell
mkdir ~/YOUR_APP
cp ./nap/ios_setup.js ~/YOUR_APP
cd ~/YOUR_APP
npm i -D plist xcode adm-zip
node ios_setup.js YOUR_FACEBOOK_APP_ID YOUR_APP
npm i
npm run setup
react-native run-ios
```

# Note
```
# Mutation
mutation loginWithFacebook($deviceInfo: String, $accessToken: String!) {
  loginWithFacebook(deviceInfo: $deviceInfo, accessToken: $accessToken) {
    user {
      name
    }
  }
}

# Variables
{
  "deviceInfo": "bar",
  "accessToken": "FAABnTrZBSJyYBAKvcWAcAOUwt07ZCVxhCYQwKKWFZAwtOhsGYZAc7olL04W8eJTlxBeZCmxCQO9kYZA4kKtTD0zmZChhb5hEoZBl7JHT0Rx39uGP8ow2X9vGoTLFZCm4Dd0NFvH0qsHXNYinsOKjszfSJVOj3DZChv0MNszawr1le8O0ToqI3Ak9Jr8X3X6imEtvJ2q8ceeVh5Ux1rSbgypRQNRDjlredVXpIZD"
}
```