import gql from 'graphql-tag'
import { compose, graphql, withApollo } from 'react-apollo'
import React, { Component } from 'react'
import {
  Text,
} from 'react-native'

import NAPClient from './NAPClient'

const Installation = ({ init }) => {
  // Install this device
  if (typeof (window) !== 'undefined') {
    init(NAPClient.info)
      .then(result => {
        NAPClient.sessionToken = result.data.init.record.sessionToken
      }, error => {
        debug.error(error)
      }).catch(err => {
        debug.error(err)
      })
  }

  return null
}

Installation.propTypes = {
  init: React.PropTypes.func.isRequired
}

const withInstallation = gql`
mutation init($info:CreateOneInstallationInput!){
  init(record: $info) {
    record {
      sessionToken
    }
  }
}
`

export default compose(graphql(withInstallation, {
  props: ({ mutate }) => ({
    init: info => mutate({
      variables: { info },
    })
  })
})(Installation))
