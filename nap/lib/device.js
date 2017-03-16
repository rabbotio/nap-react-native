import DeviceInfo from 'react-native-device-info'
module.exports.info = () => ({
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
})