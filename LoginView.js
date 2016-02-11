'use strict';

import React, {View, Text, StyleSheet, Component, AsyncStorage, TouchableHighlight, LinkingIOS, } from 'react-native';
import Settings from './Settings';
import AppTabBar from './AppTabBar';

const {API_KEY, SECRET, REDIRECT_URI} = Settings;

class LoginView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			login: false,
			douban_user_name: null,
			douban_user: null,
			access_token: null,
		};
	}

	componentWillMount() {
		this.updateLoginStatus();
	}

	updateLoginStatus() {
		let self = this;

		console.log('[Function] updateLoginStatus');

		// AsyncStorage.clear(); // <---- debug purpose

	    AsyncStorage.multiGet(['access_token', 'douban_user_name'], function(err, storage) {

	    	console.log(storage);

	    	let access_token = storage[0][1],
	    		user_name    = storage[1][1];

	    	if (!!access_token && !!user_name) {	// 取到本地的 access_token -> 获取用户信息
	    											// 和 user_name -> update `this.state`
		        fetch('https://api.douban.com/v2/user/~me', {
		          method: 'GET',
		          headers: {
		            Authorization: 'Bearer ' + access_token,
		          }
		        })
		          .then((response) => response.json())
		          .then((user_data) => {

		          	console.log(user_data);
		          	// Check out http://developers.douban.com/wiki/?title=connect

		            self.setState({
		              access_token: access_token,
		              login: true,
		              douban_user_name: user_data.name || user_name,
		              douban_user: user_data,
		            });
		          })
		          .done();
		      }
	    });
	}

	render() {

		// jshint ignore: start
		if (!this.state.login) {	// 用户未登录
			return (<LoginReminderView updateLoginStatus={this.updateLoginStatus.bind(this)}/>);
		} else {					// 用户已登录
			// return <View style={styles.container}><Text style={styles.welcome}>{this.state.douban_user_name}</Text></View>
			return (<AppTabBar access_token={this.state.access_token} />);
		}
		// jshint ignore: end
	}
}

class LoginReminderView extends Component {

	constructor(props) {
		super(props);
	}

	updateLoginStatus() {
		this.props.updateLoginStatus();  // 向上 (LoginView) 传递登录状态的更新
	}

	openLoginWebpage() { // 进行网页的授权, 仅此一次
						 // TODO: 之后应当用 refresh_token 去刷新
						 // Check out http://developers.douban.com/wiki/?title=oauth2#server_side_flow

		let self = this,
			url  = 'https://www.douban.com/service/auth2/auth?' + 
      			['client_id=' + API_KEY,
      			 'redirect_uri=' + REDIRECT_URI,
      			 'response_type=code',
      		     'scope=douban_basic_common,movie_basic,shuo_basic_r,shuo_basic_w'].join('&');

      	console.log(self);

      	LinkingIOS.addEventListener('url', _handleUrl);
		LinkingIOS.openURL(url);

      	function _handleUrl(event) {

      		console.log(event);

      		// 拒绝授权 https://www.example.com/back?error=access_denied
      		// 成功授权 https://www.example.com/back?code=9b73a4248
      		
      		if (event.hasOwnProperty('url')) {
      			let authorize_code = event.url.split('?')[1].split('=')[1];

      			if (!!authorize_code) {

      				// 根据 authorize_code 获取 access_token
      				
      				console.log('成功获取到 authorize_code: ' + authorize_code);

      				fetch('https://www.douban.com/service/auth2/token', {
			          method: 'post',
			          body: ([
			            'client_id=' + API_KEY,
			            'client_secret=' + SECRET,
			            'redirect_uri=' + REDIRECT_URI,
			            'grant_type=authorization_code',
			            'code=' + authorize_code,
			          ].join('&')),
			        })
			          .then((response) => response.json())
			          .then((d) => {

			          	console.log(d);

			            console.log('成功获取到 access_token: ' + d.access_token);

			            AsyncStorage
			              .multiSet(function saveUserData() {

			              	let data_arr = [];

			              	for (let prop in d) {
			              		if (d.hasOwnProperty(prop)) {
			              			data_arr.push([prop, d[prop].toString()]);
			              		}
			              	}

			              	return data_arr;

			              } ())
			              .then(self.updateLoginStatus());

			          })
			          .done();
      			}
      		}

      		LinkingIOS.removeEventListener('url', _handleUrl);
      	}
	}

	render() {

		// jshint ignore: start
		return (
	      <View style={styles.container}>
	        <Text style={styles.welcome}>
	          欢迎使用「看过」
	        </Text>
	        <Text style={styles.instructions}>
	          你需要先登录豆瓣帐号才可以使用「看过」的功能。授权过程在豆瓣网站完成，因此我们不会获取到你的豆瓣帐号密码信息
	        </Text>
	        <TouchableHighlight onPress={this.openLoginWebpage.bind(this)} style={styles.button} underlayColor={'white'}>
	        	<Text>授权登录</Text>
	        </TouchableHighlight>
	      </View>
	    );
	    // jshint ignore: end
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
  	margin: 10,
  }
});

module.exports = LoginView;