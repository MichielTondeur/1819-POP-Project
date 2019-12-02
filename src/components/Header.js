// Import libraries
import React from 'react';
import { View, Text } from 'react-native';

// Make a component
const Header = props => {
    const { viewStyle, headerStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={headerStyle}>{props.headerText}</Text>
        </View>
    );
};

// Component styles
const styles = {
    headerStyle: {
        fontSize: 20
    },
    viewStyle: {
        backgroundColor: '#f4a142',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        paddingBottom: 15
    }
};

// Make the component available to other parts of the app
export default Header;
