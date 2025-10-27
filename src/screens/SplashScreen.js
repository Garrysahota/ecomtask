import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { IMAGES } from '../constants/images'
import { moderateScale, scale } from 'react-native-size-matters'
import { THEME } from '../constants/theme'

const SplashScreen = () => {
    const navigation = useNavigation()

    const handleNavigation = () => {
        navigation.navigate('BottomTab');
    };


    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={IMAGES.splash} style={{ flex: 1 }}>
                <View style={styles.contentContainer}>
                    <Text style={styles.text24}>Feel your personal{`\n`}expression by choosing{`\n`}the latest design of{`\n`}furniture
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleNavigation}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: scale(100),
        marginHorizontal: moderateScale(30)
    },
    text24: {
        fontSize: scale(24),
        color: THEME.BLACK,
        fontWeight: '600'
    },
    buttonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: scale(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: scale(140),
        height: scale(40),
        borderRadius: scale(10),
        backgroundColor: THEME.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: scale(14),
        color: THEME.BLACK,
        fontWeight: '500'
    }
})