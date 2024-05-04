import React from "react";
import { View } from "react-native";

const Col = ({ children, styles }) => {
    return (
        <View style={styles}>
            {children}
        </View>
    )
};

export default Col;