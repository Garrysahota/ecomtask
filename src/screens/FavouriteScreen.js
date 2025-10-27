import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { THEME } from '../constants/theme'

const FavouriteScreen = () => {
    return (
        <View style={styles.root}>
            <Text>Favourites</Text>
        </View>
    )
}

export default FavouriteScreen

const styles = StyleSheet.create({
    root: { flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: THEME.BACKGROUND }
})