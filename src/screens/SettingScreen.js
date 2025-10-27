import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { THEME } from '../constants/theme'

const SettingScreen = () => {
    return (
        <View style={styles.root}>
            <Text>Settings</Text>
        </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    root: { flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: THEME.BACKGROUND }
})