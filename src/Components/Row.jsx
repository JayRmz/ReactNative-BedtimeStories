import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../Util/Colors";

const Row = ({ children }) => {
    return (
        <View style={styles.row}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
})

export default Row;