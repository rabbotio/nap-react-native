# React Native
react-native init $YOUR_APP_NAME
cd $YOUR_APP_NAME
# Facebook SDK
react-native install react-native-fbsdk
react-native link react-native-fbsdk
# Builder from Facebook
# https://github.com/facebook/react-native-fbsdk/blob/master/ios_setup.js
cp ../ios_setup.js ./
npm i -D plist xcode adm-zip
node ios_setup.js $YOUR_FACEBOOK_APP_ID $YOUR_APP_NAME
rm ios_setup.js
# Facebook iOS SDK
mkdir -p ios/Frameworks && curl -sS https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip > ios/Frameworks/fbsdk.zip && unzip ios/Frameworks/fbsdk.zip -d ios/Frameworks
# NAP
cp -r ../nap/lib ./
cp -r ../nap/components ./
cp ../nap/app.js ./
cp ../nap/app.json ./
cp ../nap/index.ios.js ./
# Library
npm i -S apollo-client graphql graphql-tag react-apollo react-native-device-info
npm i
# Link
# https://github.com/rebeccahughes/react-native-device-info
react-native link react-native-device-info
# Run ios
node node_modules/react-native/local-cli/cli.js run-ios