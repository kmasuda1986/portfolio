import Vue from 'vue'
// eslint-disable-next-line import/no-named-as-default
import Amplify from 'aws-amplify'
import '@aws-amplify/ui-components'
import awsExports from '../aws-exports'

Amplify.configure(awsExports)
// @ts-ignore
Vue.use(Amplify)
