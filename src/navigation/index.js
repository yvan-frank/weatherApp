import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();
/**
 * Renders the AppNavigation component.
 *
 * @return {JSX.Element} The rendered component.
 */
const AppNavigation = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default AppNavigation