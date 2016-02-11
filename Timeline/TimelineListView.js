'use strict';

import React, {View, Text, Component, } from 'react-native';

// import Post from './Post';

import {API_URL, } from './../Settings';
// import moment from 'moment/locale/zh-cn';
import RefreshableListView from 'react-native-refreshable-listview';

class TimelineListView extends Component {
	constructor(props) {
		super(props);
		this.couldLoadMorePosts = true;
	}

	componentDidMount() {
		this.fetchData(this.props.user_id, null);
	}

	fetchData(user_id, options) {
		let self = this;
		let token = this.props.access_token;
		let url = API_URL + 'shuo/v2/statuses/' + (user_id ? '/user_timeline/' + user_id : 'home_timeline') + '?';

		console.log('[Fetch] ' + url);

		if (this.couldLoadMorePosts) {
			this.couldLoadMorePosts = false;
			fetch(url, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + token,
				}
			})
			.then((res) => res.json())
			.then((data) => {

				console.log(data);
				this.couldLoadMorePosts = true;
				// let cache = self.dataCache;


			})
		}
	}

	render() {
		// jshint ignore: start
		return (<View><Text>广播列表页面</Text></View>);
		// jshint ignore: end
	}
}

module.exports = TimelineListView; 