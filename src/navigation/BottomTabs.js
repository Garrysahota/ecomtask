import { Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';
import { THEME } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREENS } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from '../assets/svg/HomeIcon';
import HomeFill from '../assets/svg/HomeFill';
import HeartIcon from '../assets/svg/HeartIcon';
import BagIcon from '../assets/svg/BagIcon';
import ProfileIcon from '../assets/svg/ProfileIcon';
import SettingIcon from '../assets/svg/SettingIcon';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: [
                        styles.tabBar,
                        {
                            // bottom: scale(5) + (Platform.OS === 'ios' ? insets.bottom : 0),
                            // marginHorizontal: '15%',
                        },
                    ],
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: THEME.PRIMARY_DARK,
                    tabBarInactiveTintColor: THEME.BLACK,
                    tabBarBackground: () => (
                        <View
                            style={[
                                StyleSheet.absoluteFill,
                                {
                                    backgroundColor: THEME.WHITE,
                                    // opacity: 0.9,
                                    // borderRadius: scale(30),
                                },
                            ]}
                        />
                    ),
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={SCREENS.HOME}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            focused ?
                                <HomeFill width={scale(24)} height={scale(24)} color={color} />
                                :
                                <HomeIcon width={scale(24)} height={scale(24)} color={color} />
                        ),
                        tabBarLabelStyle: styles.label,
                    }}
                />
                <Tab.Screen
                    name="Likes"
                    component={SCREENS.FAVOURITE}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <HeartIcon width={scale(24)} height={scale(24)} color={color} />
                        ),
                        tabBarLabelStyle: styles.label,
                    }}
                />
                <Tab.Screen
                    name="Begs"
                    component={SCREENS.CART}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <BagIcon width={scale(24)} height={scale(24)} color={color} />
                        ),
                        tabBarLabelStyle: styles.label,
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={SCREENS.PROFILE}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <ProfileIcon width={scale(24)} height={scale(24)} color={color} />
                        ),
                        tabBarLabelStyle: styles.label,
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SCREENS.SETTINGS}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <SettingIcon width={scale(24)} height={scale(24)} color={color} />
                        ),
                        tabBarLabelStyle: styles.label,
                    }}
                />
            </Tab.Navigator>
        </View>
    )
}

export default BottomTabs


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    tabBar: {
        position: 'absolute',
        width: '100%',
        height: Platform.OS === 'android' ? scale(50) : scale(70),
        paddingTop: scale(3),
        elevation: 10,
        shadowColor: THEME.SHADE,
        shadowOffset: { width: 0, height: -2 },
        borderTopWidth: 0,
    },
    label: {
        fontSize: scale(10),
        fontWeight: '500',
        marginBottom: scale(5),
    },
});