import RegisterScreen from '@/components/modules/auth/register/RegisterFrom'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'

export default class Register extends Component {
  render() {
    return (
      <ScrollView>
    <RegisterScreen/>
      </ScrollView>
    )
  }
}