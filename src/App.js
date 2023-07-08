/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './store';

import Home from './pages/Home.screen';
import Detail from './pages/Detail.screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>

        {/* Bottom Navigation */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          <Icon name="home" size={30} color="#6e80b0" />
          <Icon name="plus" size={30} color="#6e80b0" />
          <Icon name="comment" size={30} color="#6e80b0" />
          <Icon name="user" size={30} color="#6e80b0" />
        </View>
        {/* End of Bottom Navigation */}
      </PaperProvider>
    </Provider>
  );
}

export default App;
