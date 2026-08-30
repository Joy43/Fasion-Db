import LoginForm from '@/components/modules/auth/login/LoginFrom';

import  { Component } from 'react';
import { ScrollView } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <ScrollView>
        <LoginForm />
      </ScrollView>
    );
  }
}
