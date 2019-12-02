// Import libraries
import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'react-native-firebase';
import Button from './common/Button.js';
import Card from './common/Card.js';
import CardSection from './common/CardSection.js';
import Spinner from './common/Spinner.js';

// veranderen naar class based component, anders kunnen we
// geen method toekennen aan de button
//
// deze method moet deze pizza kunnen toevoegen in orders
// in firebase, we hebben de huidige user en gewoon de pizza naam nodig
//
// orders bevat een pizza_status en een paid_status
// paid_status = unpaid --> deze komt in de shopping cart terecht
//
// paid_statis = paid --> deze komt in de orderlist terecht
// en pizza_status wordt getoond
// deze kan aangepast worden in de web interface

// Make a component
class PizzaDetail extends Component {
    state = { loading: false, counter: 1 };

    addToShoppingCart() {
        this.setState({ loading: true });
        var uid = firebase.auth().currentUser.uid;

        setTimeout(() => {
            firebase
                .database()
                .ref('users/' + uid + '/orders/')
                .push({
                    name: this.props.pizza.value.name,
                    price: this.props.pizza.value.price,
                    payment_status: 'unpaid',
                    total: this.state.counter,
                    pizza_status: ''
                })
                .catch(error => {
                    console.warn(error);
                });
            this.setState({ loading: false, counter: 1 });
        }, 500);
    }

    decreaseCounter() {
        if (this.state.counter > 1) {
            this.setState({ counter: this.state.counter - 1 });
        }
    }
    increaseCounter() {
        this.setState({ counter: this.state.counter + 1 });
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <CardSection>
                    <Spinner size="small" color="#f4a142" />
                </CardSection>
            );
        }
        return (
            <CardSection>
                <Button onPress={this.decreaseCounter.bind(this)}>-</Button>
                <Text>{this.state.counter}</Text>
                <Button onPress={this.increaseCounter.bind(this)}>+</Button>
                <Button onPress={this.addToShoppingCart.bind(this)}>Add</Button>
            </CardSection>
        );
    }

    render() {
        const { name, toppings, price } = this.props.pizza.value;

        return (
            <Card>
                <CardSection>
                    <Text>Name: {name}</Text>
                </CardSection>
                <CardSection>
                    <Text>Toppings: {toppings.join(', ')}</Text>
                </CardSection>
                <CardSection>
                    <Text>Price: {price}</Text>
                </CardSection>

                {this.renderButton()}
            </Card>
        );
    }
}

// Make the component available to other parts of the app
export default PizzaDetail;
