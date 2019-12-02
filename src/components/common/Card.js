// Import libraries
import React from 'react';
import { View } from 'react-native';

// Make a component
const Card = props => {
    return <View style={styles.containerStyle}>{props.children}</View>;
};

// Component styles
const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#DDD',
        borderBottomWidth: 0,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    }
};

// Make the component available to other parts of the app
export default Card;
