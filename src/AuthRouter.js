import React from 'react';
import { View, Image } from 'react-native';
import { Router, Scene, Tabs } from 'react-native-router-flux';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

const AuthRouterComponent = () => {
    const {
        navigationBarTitleStyle,
        tabBarStyle,
        tabBarSelectedStyle
    } = styles;

    return (
        <Router>
            <Scene key="auth">
                <Scene
                    key="home"
                    component={Home}
                    navigationBarStyle={{ backgroundColor: '#f4a142' }}
                    titleStyle={navigationBarTitleStyle}
                    title="Pizza App"
                    hideNavBar={false}
                    initial
                />
                <Scene
                    key="login"
                    component={Login}
                    navigationBarStyle={{ backgroundColor: '#f4a142' }}
                    titleStyle={navigationBarTitleStyle}
                    title="Please Login"
                    hideNavBar={false}
                />
                <Scene
                    key="register"
                    component={Register}
                    navigationBarStyle={{ backgroundColor: '#f4a142' }}
                    titleStyle={navigationBarTitleStyle}
                    title="Please register"
                    hideNavBar={false}
                />
            </Scene>
        </Router>
    );
};

const styles = {
    navigationBarTitleStyle: {
        color: 'white',
        textAlign: 'center',
        flex: 1
    },
    tabBarStyle: {
        backgroundColor: '#f4a142'
    },
    tabBarSelectedStyle: {
        backgroundColor: 'white'
    }
};

export default AuthRouterComponent;
