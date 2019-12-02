// Import libraries
'use strict';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Button from './common/Button.js';

class Test extends Component {
    render() {
        return (
            <View>
                <Text>Order or shopping cart</Text>
            </View>
        );
    }
}

export default Test;
