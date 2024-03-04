/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesScreen from './screens/NotesScreen';
import EditNoteScreen from './screens/EditNoteScreen';
import AuthScreen from './screens/AuthScreen';

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth_screen">
        <Stack.Screen name="auth_screen" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="notes_screen" component={NotesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="edit_notes_screen" component={EditNoteScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
