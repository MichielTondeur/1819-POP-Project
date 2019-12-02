// Import libraries
'use strict';
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Button from './common/Button.js';
import Spinner from './common/Spinner.js';
import Card from './common/Card.js';
import CardSection from './common/CardSection.js';
import ShoppingCartDetail from './ShoppinCartDetail.js';

class ShoppingCart extends Component {
    state = { orders: [], loading: true, wallet: 0, totalprice: 0, error: '' };

    componentDidMount() {
        //Get the current userID
        var userId = firebase.auth().currentUser.uid;
        this.setState({ loading: true });

        //Get the user data
        firebase
            .database()
            .ref('/users/' + userId + '/orders')
            .orderByChild('payment_status')
            .equalTo('unpaid')
            .on(
                'value',
                snapshot => {
                    this.setState({ orders: [] });
                    if (snapshot.exists()) {
                        snapshot.forEach(orderSnapshot => {
                            var order = {
                                key: orderSnapshot.key,
                                value: orderSnapshot.val()
                            };
                            this.setState({
                                orders: [...this.state.orders, order],
                                loading: false
                            });
                            this.totalPrice();
                        });
                    } else {
                        this.setState({ loading: false });
                    }
                },
                error => {
                    console.log(error);
                    this.setState({ loading: false });
                }
            );
    }

    totalPrice() {
        this.setState({ totalprice: 0 });
        var totalprice = this.state.totalprice;
        this.state.orders.map(order => {
            var orderprice = order.value.price * order.value.total;
            totalprice = totalprice + orderprice;
        });
        this.setState({
            totalprice: totalprice
        });
    }

    completeTransaction() {
        var userId = firebase.auth().currentUser.uid;

        firebase
            .database()
            .ref('/users/' + userId + '/wallet')
            .once(
                'value',
                snapshot => {
                    var wallet = snapshot.val();
                    var walletAfterTransaction = wallet - this.state.totalprice;
                    if (walletAfterTransaction >= 0) {
                        this.setState({ error: '' });
                        this.updateWallet(walletAfterTransaction);
                        this.updateOrders();
                    } else {
                        this.setState({ error: 'Insuffienct funds' });
                    }
                },
                error => {
                    console.warn(error);
                }
            );
    }

    updateWallet(wallet) {
        var userId = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref('/users/' + userId)
            .update({
                wallet: wallet
            });
    }

    updateOrders() {
        var userId = firebase.auth().currentUser.uid;

        firebase
            .database()
            .ref('/users/' + userId + '/orders')
            .once('value', snapshot => {
                snapshot.forEach(orderSnapshot => {
                    orderSnapshot.ref.update({
                        payment_status: 'paid',
                        pizza_status: 'In the kitchen'
                    });
                });
            });
    }

    renderTotalPrice() {
        return <Text>Total Price: {this.state.totalprice}</Text>;
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
        if (this.state.loading) {
            return <Spinner size="large" color="#f4a142" />;
        } else {
            if (this.state.orders.length)
                return (
                    <ScrollView>
                        {this.state.orders.map(order => {
                            return (
                                <ShoppingCartDetail
                                    key={order.key}
                                    order={order}
                                />
                            );
                        })}
                        <Card>
                            <CardSection>{this.renderTotalPrice()}</CardSection>
                            {this.renderError()}
                            <CardSection>
                                <Button
                                    onPress={this.completeTransaction.bind(
                                        this
                                    )}
                                >
                                    Confirm payment
                                </Button>
                            </CardSection>
                        </Card>
                    </ScrollView>
                );
            else {
                return (
                    <Card>
                        <CardSection>
                            <Text>Shopping cart is empty.</Text>
                        </CardSection>
                    </Card>
                );
            }
        }
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

export default ShoppingCart;
