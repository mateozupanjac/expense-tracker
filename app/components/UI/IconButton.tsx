import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export default function IconButton({icon, size, color, onPress}: { size: number, color: string | undefined, icon: keyof typeof Ionicons.glyphMap, onPress: () => void }) {
    return <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
        <View style={styles.buttonContainer}>
            <Ionicons name={icon} size={size} color={color} />
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        margin: 8,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    pressed: {
        opacity: 0.75,
    },
});