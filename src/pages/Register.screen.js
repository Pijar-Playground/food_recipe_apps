/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, Avatar, TextInput, Snackbar, Button} from 'react-native-paper';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import database from '@react-native-firebase/database';

function Register(props) {
  const [fullname, setFullname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    axios
      .post('http://10.0.2.2:3200/v1/auth/register', {
        email,
        password,
        fullname,
        phoneNumber: phone,
      })
      .then(async res => {
        const newReference = database().ref('/users').push();
        newReference
          .set({
            email,
            fullname,
            phoneNumber: phone,
          })
          .then(() => {
            setIsSuccess(true);
          });
      })
      .catch(err => setError(err.response.data.messages))
      .finally(() => {
        setIsLoading(false);
      });
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
          label="Fullname"
          placeholder="Enter your fullname"
          onChangeText={value => setFullname(value)}
        />

        <TextInput
          mode="outlined"
          label="Phone Number"
          placeholder="Enter your phone number"
          keyboardType="numeric"
          onChangeText={value => setPhone(value)}
        />

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
          onPress={handleRegister}
          disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </Button>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: '#999999'}}>Already have account ? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{color: '#EFC81A'}}>Login in here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View>
        <Snackbar
          visible={isSuccess}
          style={{backgroundColor: '#79C079'}}
          onDismiss={() => props.navigation.navigate('Login')}
          duration={2000}>
          Register success
        </Snackbar>

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

export default Register;
