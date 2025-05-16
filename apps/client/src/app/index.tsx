import React, { Suspense, useEffect, useRef, useState } from "react";
import { Button, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
  useClerk,
  useSignIn,
  useUser,
} from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { useDeviceContext } from "twrnc";

import { api, TRPCProvider } from "../utils/api";
import tw from "../utils/tailwind";
import MyRouter from "./components/MyRouter";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import RouteWrap from "./components/RouteWrap";
import 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
//import {LogBox} from 'react-native';


const Index = () => {


  return (
    <Suspense fallback={null}>
      <RouteWrap>
      <View style={tw`w-full h-full`}>
       <MyRouter />
      </View>
      </RouteWrap>
      </Suspense>
  );
};

export default Index;
//style={tw`h-full justify-between bg-[#02182B]`}
