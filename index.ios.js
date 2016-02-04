/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LoginView from './LoginView';

class Watched extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   login: false,
    // };
  }

  updateLoginStatus(latestLoginStatus) {
    this.setState(latestLoginStatus);
  }

  render() {
    // if (!this.state.login)
      return (<LoginView />);
    // else 
      /*return (<View><Text>您已成功登录</Text></View>)*/
  }
}

AppRegistry.registerComponent('Watched', () => Watched);
