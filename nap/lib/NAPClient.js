import { AsyncStorage } from 'react-native'
import DeviceInfo from 'react-native-device-info'

class NAPClient {

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

  static get info() {
    return {
      // Devices
      deviceInfo: [
        DeviceInfo.getBrand(),
        DeviceInfo.getModel(),
        DeviceInfo.getSystemName(),
      ].join(' '),
      locale: DeviceInfo.getDeviceLocale(),
      country: DeviceInfo.getDeviceCountry(),
      timezone: DeviceInfo.getTimezone(),
      deviceName: DeviceInfo.getDeviceName(),
      isEmulater: DeviceInfo.isEmulator(),
      isTablet: DeviceInfo.isTablet(),

      // App
      bundleId: DeviceInfo.getBundleId(),
      appVersion: DeviceInfo.getReadableVersion(),
    }
  }
}

export default NAPClient