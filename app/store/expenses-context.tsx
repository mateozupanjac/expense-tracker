import { createContext, ReactNode, useReducer } from "react";

export type ExpenseType = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};
 
type ExpensesContextType = {
  expenses: ExpenseType[];
  addExpense: (expense: Omit<ExpenseType, "id">) => void;
  deleteExpense: (expenseId: string) => void;
  updateExpense: (id: string, expense: Omit<ExpenseType, "id">) => void;
};
 
const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});
 
interface Props {
  children: ReactNode;
}

const DUMMY_EXPENSES = [
    { id: 'e1', description: 'Grocery', amount: 94.12, date: new Date('2025-01-01') },
    { id: 'e2', description: 'Car Insurance', amount: 294.67, date: new Date('2023-01-02') },
    { id: 'e3', description: 'Gas', amount: 19.23, date: new Date('2025-01-03') },
    { id: 'e4', description: 'Rent', amount: 1200.00, date: new Date('2025-01-04') },
    { id: 'e5', description: 'Internet Bill', amount: 59.99, date: new Date('2025-01-05') },
    { id: 'e6', description: 'Electricity Bill', amount: 75.50, date: new Date('2025-01-06') },
    { id: 'e7', description: 'Water Bill', amount: 30.00, date: new Date('2025-01-07') },
    { id: 'e8', description: 'Phone Bill', amount: 45.00, date: new Date('2025-01-08') },
    { id: 'e9', description: 'Dining Out', amount: 60.00, date: new Date('2025-01-09') },
    { id: 'e10', description: 'Gym Membership', amount: 40.00, date: new Date('2025-01-10') }
];

type ExpensesAction =
  | { type: "ADD"; payload: Omit<ExpenseType, "id"> }
  | { type: "UPDATE"; payload: { id: string; expenseData: Omit<ExpenseType, "id"> } }
  | { type: "DELETE"; payload: { id: string } };

function ExpensesReducer(state: ExpenseType[], action: ExpensesAction): ExpenseType[] {
    switch (action.type) {
        case "ADD":
            const id = new Date().toISOString() + Math.random().toString();
            return [{...action.payload, id}, ...state];
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedExpense = {...updatableExpense, ...action.payload.expenseData};
            return state.toSpliced(updatableExpenseIndex, 1, updatedExpense);
        case "DELETE":
            return state.filter(expense => expense.id !== action.payload.id);
        default:
        return state;
    }
}

function ExpensesContextProvider({children}: Props) {
    const [expensesState, dispatch] = useReducer(ExpensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData: Omit<ExpenseType, "id">) {
        dispatch({type: "ADD", payload: expenseData});
    }

    function deleteExpense(expenseId: string) {
        dispatch({type: "DELETE", payload: {id: expenseId}});
    }

    function updateExpense(id: string, expenseData: Omit<ExpenseType, "id">) {
        dispatch({type: "UPDATE", payload: {id, expenseData}});
    }

    return (
        <ExpensesContext.Provider value={{ expenses: expensesState, addExpense, deleteExpense, updateExpense }}>
            {children}
        </ExpensesContext.Provider>
    );
}
1
export {
    ExpensesContext,
    ExpensesContextProvider
};
