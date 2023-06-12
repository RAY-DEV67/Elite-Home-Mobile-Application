import React from "react"
import {StyleSheet, View} from "react-native"

export default function Card(props) {
    return ( 
        <View style={styles.Card}>
<View style={styles.CardContent}>
{props.children}
</View>
        </View>
     );
}

const styles = StyleSheet.create({
    Card: {
        // flex:1,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: "red",
        marginVertical: 1,
        shadowOffset: {width:1, height: 1},
        width: "100%",
    }
})
