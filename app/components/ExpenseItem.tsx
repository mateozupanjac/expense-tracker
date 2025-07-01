import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../constant/styles";
import { getFormattedDate } from "../utils/date";

// Define your stack param list
type RootStackParamList = {
  ManageExpenses: { expenseId?: string };
};

export default function ExpenseItem({id, description, date, amount}: {id: string, description: string, date: Date, amount: string}) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    function expensePressHandler() {
        navigation.navigate("ManageExpenses", {
            expenseId: id
        });
    }
  return (
    <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: globalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: globalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: globalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    amountContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "white",
        borderRadius: 4,
    },
    amount: {
        color: globalStyles.colors.primary500,
        fontSize: 14,
        fontWeight: 'bold',
        minWidth: 80,
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    }
});