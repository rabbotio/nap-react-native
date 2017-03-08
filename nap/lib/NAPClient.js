import { AsyncStorage } from 'react-native'
import DeviceInfo from 'react-native-device-info'

class NAPClient {
  static getSessionToken() {
    return AsyncStorage.getItem('sessionToken')
  }
  static setSessionToken(value) {
    return AsyncStorage.setItem('sessionToken', value)
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