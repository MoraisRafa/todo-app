import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"

export function Header() {
    return (
        <View className="flex flex-row justify-center items-center space-x-5 pb-2">
        <Text className="flex text-4xl font-bold text-white">
            Minhas Tarefas
        </Text>
        <MaterialCommunityIcons name="clipboard-check-multiple-outline" size={30} color="#fff" />
        </View>
    )
}