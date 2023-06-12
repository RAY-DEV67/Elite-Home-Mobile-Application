import React, {useState} from "react";
import { View, Text, StyleSheet, Image, Button, FlatList, TouchableOpacity } from "react-native";



export default function PropertyDetails({route}) {

    const {item} = route.params
    return ( <Text>
        {item.title}
    </Text> );
}

