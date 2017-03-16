import { AsyncStorage } from 'react-native'

class persist {
  static willGetSessionToken() {
    return AsyncStorage.getItem('sessionToken')
  }

  static willSetSessionToken(value) {
    return AsyncStorage.setItem('sessionToken', value)
  }

  static willGetAccessToken() {
    return AsyncStorage.getItem('accessToken')
  }

  static willSetAccessToken(value) {
    return AsyncStorage.setItem('accessToken', value)
  }

  static willRemoveSessionToken(value) {
    return AsyncStorage.removeItem('accessToken', value)
  }
}

module.exports = persist
