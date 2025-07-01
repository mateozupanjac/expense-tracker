import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet, View } from "react-native";
import IconButton from "./components/UI/IconButton";
import { globalStyles } from "./constant/styles";
import AllExpensesScreen from "./screens/AllExpenses";
import ManageExpensesScreen from "./screens/ManageExpenses";
import RecentExpensesScreen from "./screens/RecentExpenses";
import { ExpensesContextProvider } from "./store/expenses-context";
export type RootStackParamList = {
  ExpensesOverview: undefined;
  ManageExpenses: { expenseId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: globalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: globalStyles.colors.primary500 },
        tabBarActiveTintColor: globalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          title: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.rootScreen}>
      <StatusBar barStyle="default" />
      <ExpensesContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: globalStyles.colors.primary500 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageExpenses"
            component={ManageExpensesScreen}
            options={{
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </ExpensesContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
