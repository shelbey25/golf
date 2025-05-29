import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { api } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppState } from "./RouteWrap";

export default function CreateAccount() {
  const {setMode} = useAppState()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const creatAccount = api.golf_user.createUser.useMutation({
    onSuccess: async (result) => {
      await AsyncStorage.setItem('my_basic_info', result);
      const my_info = await AsyncStorage.getItem('my_basic_info')
      console.log(my_info)
      setMode("Main")
    }
  })

  const handleCreateAccount = async () => {

    await creatAccount.mutateAsync({
      name: name,
      email: email,
      password: password
    })
  };

  return (
    <View style={tw`flex-1 bg-slate-800 justify-center px-6`}>
      <Text style={tw`text-2xl font-bold mb-6 text-white text-center`}>Create an Account</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={tw`border text-white border-gray-300 rounded-lg px-4 py-3 mb-4`}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={tw`border text-white border-gray-300 rounded-lg px-4 py-3 mb-4`}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
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
  <TouchableOpacity >
    <Text style={tw`text-blue-500 font-semibold`}>Sign in</Text>
  </TouchableOpacity>
</View>

    </View>
  );
}
