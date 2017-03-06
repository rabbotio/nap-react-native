import { AsyncStorage as localStorage } from 'react-native'
import DeviceInfo from 'react-native-device-info'

class NAPClient {
  static get sessionToken() {
    return localStorage.getItem('sessionToken')
  }
  static set sessionToken(value) {
    localStorage.setItem('sessionToken', value)
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