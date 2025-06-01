import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import tw from 'twrnc';
import { useAppState } from './RouteWrap';
import LoadingScreen from './Loading';
import { api } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const {setMode} = useAppState()

    const verifySignIn = api.golf_user.verifyUser.useMutation()
  

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifySignIn.mutateAsync({
        email: email,
        password: password
      });
      if (response.isValid) {
        await AsyncStorage.setItem('my_basic_info', response.result);
        setMode("Main")
      }
    } catch (error) {
      Alert.alert('Sign In Failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <View style={tw`flex-1 bg-stone-800 p-6 justify-center`}>
      <View style={tw`rounded-2xl  shadow-sm`}>
        {/* Header */}
        <Text style={[tw`text-2xl font-bold mb-6 text-white text-center`]}>
          Welcome Back
        </Text>


        
          <TextInput
            style={tw`border text-white border-gray-300 rounded-lg px-4 py-3 mb-6`}
            placeholder="Email"
            placeholderTextColor="#a8a29e"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={tw`border text-white border-gray-300 rounded-lg px-4 py-3 mb-6`}
            placeholder="Password"
            placeholderTextColor="#a8a29e"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleSignIn}
          disabled={isLoading}
          style={tw`bg-blue-600 py-3 rounded-xl  mb-4`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={tw`text-white text-center font-semibold text-lg`}>
              Sign In
            </Text>
          )}
        </TouchableOpacity>

<View style={tw` flex-row justify-center`}>
  <Text style={tw`text-gray-400`}>Don't have an account? </Text>
  <TouchableOpacity onPress={() => {setMode("Account Creation")}}>
    <Text style={tw`text-blue-500 font-semibold`}>Sign up</Text>
  </TouchableOpacity>
</View>
       

      </View>
    </View>
  );
};

export default SignInScreen;