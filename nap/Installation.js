import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'
import {
  Text,
} from 'react-native'

import DeviceInfo from 'react-native-device-info'
import NAPClient from './lib/NAPClient'

const info = {
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

const Installation = ({ init }) => {
  // Install this device
  if (typeof (window) !== 'undefined') {
    init(info)
      .then(result => {
        NAPClient.sessionToken = result.data.init.record.sessionToken
        NAPClient.sessionId = result.data.init.record._id
      }, error => {
        debug.error(error)
      }).catch(err => {
        debug.error(err)
      })
  }

  return <Text></Text>
}

Installation.propTypes = {
  init: React.PropTypes.func.isRequired
}

const withInstallation = gql`
mutation init($info:CreateOneInstallationInput!){
  init(record: $info) {
    record {
      sessionToken
      _id
    }
  }
}
`

export default graphql(withInstallation, {
  props: ({ mutate }) => ({
    init: info => mutate({
      variables: { info },
    })
  })
})(Installation)
