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