// Import libraries
import React, { Component } from 'react';
import { Text } from 'react-native';
import Card from './common/Card.js';
import CardSection from './common/CardSection.js';
import Button from './common/Button.js';
import firebase from 'react-native-firebase';

// Make a component
class ShoppingCartDetail extends Component {
    delete() {
        var userId = firebase.auth().currentUser.uid;
        var orderId = this.props.order.key;
        firebase
            .database()
            .ref('/users/' + userId + '/orders/' + orderId)
            .remove();
    }

    total() {
        return this.props.order.value.price * this.props.order.value.total;
    }
    render() {
        const { name, price, total } = this.props.order.value;

        return (
            <Card>
                <CardSection>
                    <Text>
                        Order: {total} X {name}
                    </Text>
                </CardSection>
                <CardSection>
                    <Text>
                        Price: {total} X {price} = {this.total()}
                    </Text>
                </CardSection>
                <CardSection>
                    <Button onPress={this.delete.bind(this)}>Delete</Button>
                </CardSection>
            </Card>
        );
    }
}

// Make the component available to other parts of the app
export default ShoppingCartDetail;
