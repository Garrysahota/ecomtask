import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../screens';
import { PAGES } from '../pages';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const Roots = () => {

    let options = { headerShown: false, animation: 'ios_from_right', fullScreenGestureEnabled: true };

    return (
        <Stack.Navigator initialRouteName={'Splash'} screenOptions={options}>
            <Stack.Screen name="Splash" component={SCREENS.SPLASH} />
            <Stack.Screen name="BottomTab" component={BottomTabs} />
            <Stack.Screen name="ProductDetails" component={PAGES.PRODUCTDETAIL} />
        </Stack.Navigator>
    )
}

export default Roots;
