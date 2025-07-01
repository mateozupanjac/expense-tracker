import { globalStyles } from "@/app/constant/styles";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Button({
  children,
  onPress,
  mode,
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  mode?: "flat";
  style?: object;
}) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({ pressed }) =>  pressed && styles.pressed}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: globalStyles.colors.primary500,
    },
    flat: {
        backgroundColor: "transparent",
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    flatText: {
        color: globalStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: globalStyles.colors.primary100,
        borderRadius: 4,
    }

});