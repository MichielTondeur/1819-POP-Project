/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RouterComponent from './src/Router';
import AuthRouterComponent from './src/AuthRouter';
import firebase from 'react-native-firebase';
import Spinner from './src/components/common/Spinner.js';

export default class App extends Component {
    state = { loggedIn: null };

    // Check if user is logged in or not on mount
    componentDidMount() {
        setTimeout(() => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.setState({ loggedIn: true });
                } else {
                    this.setState({ loggedIn: false });
                }
            });
        }, 1000);
    }

    // Conditional render the router
    renderRouter() {
        if (this.state.loggedIn == null) {
            return <Spinner size="large" color="#f4a142" />;
        } else if (this.state.loggedIn) {
            return <RouterComponent />;
        }
        return <AuthRouterComponent />;
    }

    render() {
        return <View style={{ flex: 1 }}>{this.renderRouter()}</View>;
    }
}
