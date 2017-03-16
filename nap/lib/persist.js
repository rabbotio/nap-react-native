import { AsyncStorage } from 'react-native'

class persist {
  static willGetSessionToken() {
    return AsyncStorage.getItem('sessionToken')
  }

  static willSetSessionToken(value) {
    return AsyncStorage.setItem('sessionToken', value)
  }

  static willRemoveSessionToken(value) {
    return AsyncStorage.removeItem('sessionToken')
  }
}

module.exports = persist
