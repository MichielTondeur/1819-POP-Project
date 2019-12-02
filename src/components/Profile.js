// Import libraries
'use strict';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Button from './common/Button.js';
import Spinner from './common/Spinner.js';
import Card from './common/Card.js';
import CardSection from './common/CardSection.js';

class Profile extends Component {
    state = { name: '', wallet: '' };

    componentDidMount() {
        //Get the current userID
        var userId = firebase.auth().currentUser.uid;
        //Get the user data
        firebase
            .database()
            .ref('/users/' + userId)
            .on('value', snapshot => {
                var name = snapshot.child('name').val();
                var wallet = snapshot.child('wallet').val();
                this.setState({ name: name, wallet: wallet });
            });
    }

    addToWallet() {
        var new_wallet = this.state.wallet + 100;
        var userId = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref('users/' + userId)
            .update({
                wallet: new_wallet
            });
        this.setState({ wallet: new_wallet });
    }

    render() {
        if (this.state.name != '') {
            return (
                <Card>
                    <CardSection>
                        <Text>Welcome, {this.state.name}!</Text>
                    </CardSection>
                    <CardSection>
                        <Text>
                            Your current wallet value is {this.state.wallet}.
                        </Text>
                        <Button onPress={this.addToWallet.bind(this)}>
                            Add to wallet
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log out
                        </Button>
                    </CardSection>
                </Card>
            );
        } else {
            return <Spinner size="large" color="#f4a142" />;
        }
    }
}

export default Profile;
