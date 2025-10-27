import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { THEME } from '../constants/theme'

const CartScreen = () => {
    return (
        <View style={styles.root}>
            <Text>Cart</Text>
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    root: { flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: THEME.BACKGROUND }
})