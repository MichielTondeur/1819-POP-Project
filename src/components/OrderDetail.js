// Import libraries
import React from 'react';
import { Text } from 'react-native';
import Card from './common/Card.js';
import CardSection from './common/CardSection.js';

// Make a component
const OrderDetail = ({ order }) => {
    const { name, total, pizza_status, order_date } = order.value;
    return (
        <Card>
            <CardSection>
                <Text>
                    You ordered {total} X {name}
                </Text>
            </CardSection>
            <CardSection>
                <Text>The current status is: {pizza_status}</Text>
            </CardSection>
        </Card>
    );
};

// Make the component available to other parts of the app
export default OrderDetail;
