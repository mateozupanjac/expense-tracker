import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { globalStyles } from "../constant/styles";
import { ExpensesContext, ExpenseType } from "../store/expenses-context";

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpenses'>;

export default function ManageExpensesScreen({
  route,
  navigation,
}: Props) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses?.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId!);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData: Omit<ExpenseType, "id">) {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm isEditing={isEditing} onCancel={cancelHandler} onSubmit={confirmHandler} defaultValue={selectedExpense} />
      
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={globalStyles.colors.error500}
            size={24}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: globalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderTopWidth: 2,
    borderTopColor: globalStyles.colors.primary200,
    padding: 8,
  },

  
});
