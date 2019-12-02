// Import libraries
'use strict';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Spinner from './common/Spinner.js';
import Card from './common/Card.js';
import CardSection from './common/CardSection.js';
import PizzaDetail from './PizzaDetail.js';

class PizzaList extends Component {
    state = { pizzas: [], loading: true };

    componentDidMount() {
        this.setState({ loading: true });
        var userId = firebase.auth().currentUser.uid;

        //Get the user data
        firebase
            .database()
            .ref('/pizzas')
            .on(
                'value',
                snapshot => {
                    snapshot.forEach(pizzaSnapshot => {
                        var pizza = {
                            key: pizzaSnapshot.key,
                            value: pizzaSnapshot.val()
                        };
                        this.setState({
                            pizzas: [...this.state.pizzas, pizza],
                            loading: false
                        });
                    });
                },
                error => {
                    console.warn(error);
                    this.setState({ loading: false });
                }
            );
    }

    render() {
        if (this.state.loading) {
            return <Spinner size="large" color="#f4a142" />;
        } else {
            if (this.state.pizzas.length) {
                return this.state.pizzas.map(pizza => (
                    <PizzaDetail key={pizza.key} pizza={pizza} />
                ));
            }
            return (
                <Card>
                    <CardSection>
                        <Text>No pizzas found</Text>
                    </CardSection>
                </Card>
            );
        }
    }
}

export default PizzaList;
