import React from 'react';
import { View, Image } from 'react-native';
import { Router, Scene, Tabs } from 'react-native-router-flux';
import Index from './components/Index';
import Test from './components/Test';
import Profile from './components/Profile';
import OrderList from './components/OrderList';
import PizzaList from './components/PizzaList';
import ShoppingCart from './components/ShoppingCart';

const BLACK_PIZZA = require('./images/pizza-black.png');
const ORANGE_PIZZA = require('./images/pizza-orange.png');
const BLACK_CART = require('./images/shopping-cart-black.png');
const ORANGE_CART = require('./images/shopping-cart-orange.png');
const BLACK_ORDER = require('./images/pizza-delivery-black.png');
const ORANGE_ORDER = require('./images/pizza-delivery-orange.png');
const BLACK_PROFILE = require('./images/profile-black.png');
const ORANGE_PROFILE = require('./images/profile-orange.png');

const TabIcon = ({ title, focused }) => {
    let image = focused ? ORANGE_PIZZA : BLACK_PIZZA;

    switch (title) {
        case 'pizzaTab':
            image = focused ? ORANGE_PIZZA : BLACK_PIZZA;
            break;
        case 'shoppingCartTab':
            image = focused ? ORANGE_CART : BLACK_CART;
            break;
        case 'ordersTab':
            image = focused ? ORANGE_ORDER : BLACK_ORDER;
            break;
        case 'profileTab':
            image = focused ? ORANGE_PROFILE : BLACK_PROFILE;
            break;
    }
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center'
            }}
        >
            <Image style={{ width: 35, height: 35 }} source={image} />
        </View>
    );
};

const RouterComponent = () => {
    const {
        navigationBarTitleStyle,
        tabBarStyle,
        tabBarSelectedStyle
    } = styles;

    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Tabs key="tabbar" hideNavBar showLabel={false}>
                    <Scene key="pizzaTab" title="pizzaTab" icon={TabIcon}>
                        <Tabs
                            key="pizzatabbar"
                            hideNavBar
                            tabBarPosition="top"
                            showLabel
                            tabBarStyle={tabBarStyle}
                            indicatorStyle={tabBarSelectedStyle}
                        >
                            <Scene
                                key="pizzamake"
                                title="Make your own pizza"
                                hideNavBar
                            >
                                <Scene key="index" component={Index} />
                            </Scene>
                            <Scene
                                key="pizzadefault"
                                title="Order a pizza"
                                hideNavBar
                                initial
                            >
                                <Scene key="pizzalist" component={PizzaList} />
                            </Scene>
                        </Tabs>
                    </Scene>
                    <Scene
                        key="shoppingCartTab"
                        title="shoppingCartTab"
                        icon={TabIcon}
                    >
                        <Scene
                            key="shopppingCart"
                            component={ShoppingCart}
                            title="Shopping Cart"
                            navigationBarStyle={{
                                backgroundColor: '#f4a142'
                            }}
                            titleStyle={navigationBarTitleStyle}
                        />
                    </Scene>
                    <Scene key="ordersTab" title="ordersTab" icon={TabIcon}>
                        <Scene
                            key="orderList"
                            component={OrderList}
                            title="Orders"
                            navigationBarStyle={{
                                backgroundColor: '#f4a142'
                            }}
                            titleStyle={navigationBarTitleStyle}
                        />
                    </Scene>
                    <Scene
                        key="profileTab"
                        title="profileTab"
                        icon={TabIcon}
                        initial
                    >
                        <Scene
                            key="profile"
                            component={Profile}
                            title="Profile"
                            navigationBarStyle={{
                                backgroundColor: '#f4a142'
                            }}
                            titleStyle={navigationBarTitleStyle}
                        />
                    </Scene>
                </Tabs>
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

export default RouterComponent;
