// Import libraries
import React from 'react';
import { View } from 'react-native';

// Make a component
const CardSection = props => {
    return <View style={styles.containerStyle}>{props.children}</View>;
};

// Component styles
const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

// Make the component available to other parts of the app
export default CardSection;
