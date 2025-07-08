import { globalStyles } from "@/app/constant/styles";
import { ExpenseType } from "@/app/store/expenses-context";
import { getFormattedDate } from "@/app/utils/date";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";
import Input from "./Input";

export function ExpenseForm({
  onCancel,
  onSubmit,
  isEditing,
  defaultValue,
}: {
  onCancel: () => void;
  onSubmit: (expenseData: Omit<ExpenseType, "id">) => void;
  isEditing: boolean;
  defaultValue?: Omit<ExpenseType, "id">;
}) {
  const [inputValues, setInputValues] = useState({
    amount: { value: defaultValue?.amount || "", isValid: true },
    date: {
      value: getFormattedDate(defaultValue?.date) || "",
      isValid: true,
    },
    description: {
      value: defaultValue?.description || "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: string) {
    setInputValues((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  } 

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: amountIsValid },
          date: { value: currInputs.date.value, isValid: dateIsValid },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }

    onSubmit(expenseData); 
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (val) => inputChangedHandler("amount", val),
            value: String(inputValues.amount.value),
          }}
          invalid={!inputValues.amount.value}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (val) => inputChangedHandler("date", val),
            value: inputValues.date.value,
          }}
          invalid={!inputValues.date.value}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: (val) => inputChangedHandler("description", val),
          value: inputValues.description.value,
        }}
        invalid={!inputValues.description.value}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data.
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
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
  errorText: {
    textAlign: "center",
    color: globalStyles.colors.error500,
    margin: 8,
  },
});
