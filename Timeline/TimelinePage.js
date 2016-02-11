'use strict';

import React, {View, Text, Component} from 'react-native';
import TimelineListView from './TimelineListView';

class TimelinePage extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		console.log('[Render] TimelinePage');
		console.log(this.props);

		// jshint ignore: start
	      return (
	        <View style={{ flex: 1, marginTop: 0, marginBottom: 49, }}>
	          <TimelineListView {...this.props}/>
	        </View>);
	    // jshint ignore: end
	}
}

module.exports = TimelinePage;