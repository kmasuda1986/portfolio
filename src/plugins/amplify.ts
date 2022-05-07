import Vue from 'vue'
import Amplify from 'aws-amplify'
import '@aws-amplify/ui-components'
import awsExports from '../aws-exports'

Amplify.configure(awsExports)
// @ts-ignore
Vue.use(Amplify)
