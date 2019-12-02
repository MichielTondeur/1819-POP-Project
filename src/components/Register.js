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

class Register extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        adress: '',
        error: '',
        loading: false
    };

    // Write additional user data to the Firebase database
    writeUserData(uid) {
        firebase
            .database()
            .ref('users/' + uid + '/')
            .set({
                name: this.state.name,
                adress: this.state.adress,
                wallet: 0,
                created_at: firebase.database.ServerValue.TIMESTAMP
            });
    }

    onRegister() {
        const { email, password, name, adress } = this.state;
        this.setState({ error: '', loading: true });

        if (email == '' || password == '' || name == '' || adress == '') {
            this.setState({
                error: 'Forms should not be empty',
                loading: false
            });
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    this.writeUserData(firebase.auth().currentUser.uid);
                })
                .catch(error => {
                    var errorCode = error.code;
                    if (errorCode === 'auth/invalid-email') {
                        this.setState({ loading: false });
                        this.setState({ error: 'Email address is not valid.' });
                    } else if (errorCode === 'auth/email-already-in-use	') {
                        this.setState({ loading: false });
                        this.setState({
                            error: 'Email addrres is already in use.'
                        });
                    } else if (errorCode === 'auth/weak-password') {
                        this.setState({ loading: false });
                        this.setState({ error: error.message });
                    }
                });
        }
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" color="#f4a142" />;
        }
        return <Button onPress={this.onRegister.bind(this)}>Register</Button>;
    }

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
                        label="Name"
                        placeholder="Full name"
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Adress"
                        placeholder="Address"
                        value={this.state.adress}
                        onChangeText={adress => this.setState({ adress })}
                    />
                </CardSection>
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
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>{this.renderButton()}</CardSection>
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

export default Register;
