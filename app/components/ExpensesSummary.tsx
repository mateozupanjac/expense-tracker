import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../constant/styles";

export default function ExpensesSummary({periodName, expenses}: {expenses?: any[], periodName: string}) {
    const expensesSum = expenses?.reduce((sum, expense) => sum + expense.amount, 0);
    return <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum?.toFixed(2)}</Text>
        </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: globalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: globalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: globalStyles.colors.primary500,
    }
});