'use strict';

import React, {StyleSheet, TouchableHighlight, Image, View, } from 'react-native';
import {BASE_COLOR, } from './Settings';
import Icon from 'react-native-vector-icons/Ionicons';

var styles = StyleSheet.create({
  backButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 5,
  }
});

var BackButton = React.createClass({
  render() {
    return (
      <Icon name='ios-arrow-back' size={30} color={BASE_COLOR} style={styles.backButton} />
    );
  }
});


module.exports = BackButton;