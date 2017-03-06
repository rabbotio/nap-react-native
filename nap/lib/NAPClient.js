import { AsyncStorage as localStorage } from 'react-native'

class NAPClient {
  static get sessionToken() {
    return localStorage.getItem('sessionToken')
  }
  static set sessionToken(value) {
    localStorage.setItem('sessionToken', value)
  }

  static get sessionId() {
    return localStorage.getItem('sessionId')
  }
  static set sessionId(value) {
    localStorage.setItem('sessionId', value)
  }
}

export default NAPClient