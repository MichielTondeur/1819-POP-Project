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
import OrderDetail from './OrderDetail.js';

class OrderList extends Component {
    state = { orders: [], loading: true };

    componentDidMount() {
        //Get the current userID
        var userId = firebase.auth().currentUser.uid;
        this.setState({ loading: true });

        //Get the user data
        firebase
            .database()
            .ref('/users/' + userId + '/orders')
            .orderByChild('payment_status')
            .equalTo('paid')
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
                        });
                    } else {
                        this.setState({ loading: false });
                    }
                },
                error => {
                    console.warn('order error');
                    console.warn(error);

                    this.setState({ loading: false });
                }
            );
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
                                <OrderDetail key={order.key} order={order} />
                            );
                        })}
                    </ScrollView>
                );
            else {
                return (
                    <Card>
                        <CardSection>
                            <Text>No orders found</Text>
                        </CardSection>
                    </Card>
                );
            }
        }
    }
}

export default OrderList;
