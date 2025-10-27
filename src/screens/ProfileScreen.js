import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { THEME } from '../constants/theme'

const ProfileScreen = () => {
    return (
        <View style={styles.root}>
            <Text>User Profile</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    root: { flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: THEME.BACKGROUND }
})