/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, Avatar, TextInput, Snackbar, Button} from 'react-native-paper';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const handleLogin = () => {
    axios
      .post('http://10.0.2.2:3200/v1/auth/login', {
        email,
        password,
      })
      .then(async res => {
        await AsyncStorage.setItem('token', res.data.data.token);
        await AsyncStorage.setItem(
          'profile',
          JSON.stringify(res.data.data.result),
        );
        props.navigation.navigate('Home');
      })
      .catch(err => setError(err.response.data.messages));
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 15,
          }}>
          <Avatar.Image
            size={150}
            icon="users"
            source={require('../assets/user.png')}
            style={{backgroundColor: '#C4C4C4'}}
          />
        </View>

        <Text
          style={{
            textAlign: 'center',
            color: '#EFC81A',
            fontSize: 20,
            textShadowColor: 'rgba(0, 0, 0, 0.20)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 2,
          }}>
          Welcome
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            marginBottom: 30,
          }}>
          Log in to your exiting account.
        </Text>

        <TextInput
          mode="outlined"
          label="Email Address"
          placeholder="Enter your email address"
          onChangeText={value => setEmail(value)}
        />

        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={value => setPassword(value)}
        />

        <Button
          mode="contained"
          style={{
            borderRadius: 5,
            padding: 5,
            backgroundColor: '#EFC81A',
            marginTop: 40,
            marginBottom: 10,
          }}
          onPress={handleLogin}>
          Log In
        </Button>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: '#999999'}}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
            <Text style={{color: '#EFC81A'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View>
        <Snackbar
          visible={Boolean(error)}
          style={{backgroundColor: '#CB3837'}}
          onDismiss={() => setError(null)}
          action={{
            label: 'X',
            onPress: () => {
              setError(null);
            },
          }}>
          {error}
        </Snackbar>
      </View>
    </View>
  );
}

export default Login;
