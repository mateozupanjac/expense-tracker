import { globalStyles } from "@/app/constant/styles";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

export default function Input({
  label,
  textInputConfig,
  style,
  invalid,
}: {
  label: string;
  textInputConfig?: TextInputProps;
  style?: object;
  invalid?: boolean;
}) {
  const inputStyle: any = [styles.input];
  if (textInputConfig?.multiline) {
    inputStyle.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyle.push(styles.invalidInput);
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLable]}>
        {label}
      </Text>
      <TextInput {...(textInputConfig || {})} style={inputStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: globalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: globalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    color: globalStyles.colors.primary700,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLable: {
    color: globalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: globalStyles.colors.error50,
  },
});
