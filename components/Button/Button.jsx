import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default function Button({ children, onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}
