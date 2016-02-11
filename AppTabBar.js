/*
 * This is the entrance of the app.
 *
 * @Author: Ivan Jiang
 */

'use strict';

import React, {Component, Text, TabBarIOS, View, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Router from 'react-native-simple-router';
import BackButton from './BackButton';
import TimelinePage from './Timeline/TimelinePage';
import Settings from './Settings';

const {BASE_COLOR, GRAY_COLOR} = Settings;

class AppTabBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'timelineTab',
      		notifCount: 0,
      		presses: 0,
		};
	}

	addNavigator(firstRoute) {

		// jshint ignore: start
		return (
	      <Router headerStyle={{flex: 1, backgroundColor: '#fff', }}
	              titleStyle={{color: '#000', }}
	              statusBarColor='black'
	              borderBottomWidth={1}
	              borderColor='#D8D8D8'
	              firstRoute={firstRoute} 
	              backButtonComponent={BackButton}
	      />);
		// jshint ignore: end
	}

	render() {
		return (
			// jshint ignore: start
			<TabBarIOS selectedTab = {this.state.selectedTab}
					   tintColor   = {BASE_COLOR}
					   barTintColor= {'#fff'}>

				<Icon.TabBarItem
					title =  {'广播'}
					iconName = {'ios-people-outline'}
					selectedIconName = {'ios-people'}
					selected = {this.state.selectedTab === 'timelineTab'}
					onPress = {() => {
						this.setState({ selectedTab : 'timelineTab' });
					}}>

					{this.addNavigator({
						name: '广播',
						component: TimelinePage,
						passProps: {
							access_token: this.props.access_token,
						}
					})}

				</Icon.TabBarItem>

				{/*<Icon.TabBarItem
					title = {'电影'}
					iconName = {'ios-film-outline'}
					selectedIconName = {'ios-film'} 
					selected = {this.state.selectedTab === 'movieTab'}
					onPress = { () => {
						this.setState({ selectedTab : 'movieTab' });
					}}>

					{this.addNavigator({
						name: '电影',
						// component: MoviePage,
					})}

				</Icon.TabBarItem>

				<Icon.TabBarItem
					title = {'我'}
					iconName = {'ios-person-outline'}
					selectedIconName = {'ios-person'}
					selected = {this.state.selectedTab === 'meTab'}
					onPress = { () => {
						this.setState({ selectedTab : 'meTab' });
					}}>

					{this.addNavigator({
						name: '我',
						// component: MePage,
					})}

				</Icon.TabBarItem>*/}

			</TabBarIOS>
			// jshint ignore: end
			)
	}
}

module.exports = AppTabBar;
