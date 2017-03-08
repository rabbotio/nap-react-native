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
        return NAPClient.setSessionToken(result.data.init.record.sessionToken)
      }, error => {
        alert(error)
      }).catch(err => {
        alert(error)
      })
  }

  return <Text>hmm</Text>
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
