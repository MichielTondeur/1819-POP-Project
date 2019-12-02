// Import libraries
'use strict';
import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import Spinner from './common/Spinner';
import firebase from 'react-native-firebase';

// Make a component
class Login extends Component {
    state = { email: '', password: '', error: '', loading: false };

    // Authenticate with Firebase
    onLogin() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        if (email == '' || password == '') {
            this.setState({
                error: 'Credentials should not be empty',
                loading: false
            });
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    this.setState({
                        email: '',
                        password: '',
                        error: '',
                        loading: false
                    });
                })
                .catch(error => {
                    var errorCode = error.code;
                    if (errorCode === 'auth/invalid-email') {
                        this.setState({
                            error: 'Email address is not valid',
                            loading: false
                        });
                    } else if (errorCode === 'auth/wrong-password') {
                        this.setState({
                            error: 'Failed password',
                            loading: false
                        });
                    } else if (errorCode === 'auth/user-not-found') {
                        this.setState({
                            error: 'User not found.',
                            loading: false
                        });
                    }
                });
        }
    }

    // Redirect to Register component
    onRedirect() {
        Actions.register();
    }

    // Conditional render the button
    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" color="#f4a142" />;
        }

        return <Button onPress={this.onLogin.bind(this)}>Login</Button>;
    }

    // Conditional render the error
    renderError() {
        if (this.state.error != '') {
            return (
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            );
        }
        return null;
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="user@gmail.com"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Password"
                        placeholder="password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />
                </CardSection>

                {this.renderError()}

                <CardSection>{this.renderButton()}</CardSection>
                <CardSection>
                    <TouchableHighlight onPress={this.onRedirect.bind(this)}>
                        <Text>Don't have an account? Create one here.</Text>
                    </TouchableHighlight>
                </CardSection>
            </Card>
        );
    }
}

// Component styles
const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default Login;
