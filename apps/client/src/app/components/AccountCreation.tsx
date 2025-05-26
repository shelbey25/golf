import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    // Handle account creation logic here
    console.log("Creating account:", { name, email, password });
  };

  return (
    <View style={tw`flex-1 bg-slate-800 justify-center px-6`}>
      <Text style={tw`text-2xl font-bold mb-6 text-white text-center`}>Create an Account</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-4`}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-4`}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-6`}
      />

      <TouchableOpacity
        onPress={handleCreateAccount}
        style={tw`bg-blue-600 py-3 rounded-lg`}
      >
        <Text style={tw`text-white text-center font-semibold text-lg`}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
