import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { globalStyles } from "../constant/styles";
import { ExpensesContext } from "../store/expenses-context";

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpenses'>;

export default function ManageExpensesScreen({
  route,
  navigation,
}: Props) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

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

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {description: "Test!!!!", amount: 24.99, date: new Date("2025-06-29")});
    } else {
      expensesCtx.addExpense({description: "Test", amount: 19.99, date: new Date("2025-06-28")});
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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

  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
