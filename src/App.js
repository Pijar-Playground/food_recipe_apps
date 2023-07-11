/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './store';

import Home from './pages/Home.screen';
import Detail from './pages/Detail.screen';
import Login from './pages/Login.screen';
import Register from './pages/Register.screen';
import Chat from './pages/Chat.screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');

      // AsyncStorage.clear();

      if (token) {
        setIsLogin(true);
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Chat">
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
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{headerShown: false}}
            />

            {isLogin ? (
              <></>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>

        {/* Bottom Navigation */}
        {/* <View
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
        </View> */}
        {/* End of Bottom Navigation */}
      </PaperProvider>
    </Provider>
  );
}

export default App;
