import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../constant/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";



export default function ExpensesOutput({ expenses, expensesPeriod, fallbackText }: {expenses?: any[], expensesPeriod: string, fallbackText?: string}) {

    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if(expenses && expenses?.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }
    return <View style={styles.container}>
        <ExpensesSummary periodName={expensesPeriod}  expenses={expenses}/>
        {content}
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.colors.primary100,
        padding: 24,
        flex: 1,
    },
    infoText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginTop: 32,
    }
});