// Import libraries
'use strict';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Button from './common/Button';

// Make a component
class Home extends Component {
    // Redirect to Login Component
    onLogin() {
        Actions.login();
    }

    // Redirect to Register Component
    onRegister() {
        Actions.register();
    }

    render() {
        return (
            <View style={{ marginTop: 20 }}>
                <Card>
                    <CardSection>
                        <Button onPress={this.onLogin.bind(this)}>Login</Button>
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        <Button onPress={this.onRegister.bind(this)}>
                            Register
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

export default Home;
