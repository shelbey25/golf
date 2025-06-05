import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";
import { api } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppState } from "./RouteWrap";
import LoadingScreen from "./Loading";

export default function CreateAccount() {
  const {setMode} = useAppState()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUploading, setIsUploading] = useState(false)
  const creatAccount = api.golf_user.createUser.useMutation({
    onSuccess: async (result) => {
      await AsyncStorage.setItem('my_basic_info', result);
      setMode("Add PFP")
      setIsUploading(false)
    },
    onError: (error) => {
      if (
        error.data?.code === 'INTERNAL_SERVER_ERROR' &&
        error.message.includes('Unique constraint failed')
      ) {
        // Show specific message to user
        Alert.alert("Account Creation Failed", "Email or name is already in use.");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
  
      setIsUploading(false);
    }
    
  })

  const handleCreateAccount = async () => {
    setIsUploading(true)
    await creatAccount.mutateAsync({
      name: name,
      email: email,
      password: password
    })
    setIsUploading(false)
  };

  if (isUploading) {
    return <LoadingScreen />
  }

  return (
    <View style={tw`flex-1 bg-stone-800 justify-center px-6`}>
      <Text style={tw`text-2xl font-bold mb-6 text-white text-center`}>Create an Account</Text>

      <TextInput
        placeholder="Name"
        value={name}
        placeholderTextColor="#a8a29e"
        onChangeText={setName}
        style={tw`border text-white border-gray-300 rounded-lg px-4 py-3 mb-4`}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#a8a29e"
        autoCapitalize="none"
        style={tw`border text-white border-gray-300 rounded-lg px-4 py-3 mb-4`}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#a8a29e"
        secureTextEntry
        style={tw`border text-white border-gray-300 rounded-lg px-4 py-3 mb-6`}
      />

      <TouchableOpacity
        onPress={handleCreateAccount}
        style={tw`bg-blue-600 py-3 rounded-lg`}
      >
        <Text style={tw`text-white text-center font-semibold text-lg`}>Sign Up</Text>
      </TouchableOpacity>

      <View style={tw`mt-4 flex-row justify-center`}>
  <Text style={tw`text-gray-400`}>Already have an account? </Text>
  <TouchableOpacity onPress={() => {setMode("SignIn")}}>
    <Text style={tw`text-blue-500 font-semibold`}>Sign in</Text>
  </TouchableOpacity>
</View>

    </View>
  );
}
