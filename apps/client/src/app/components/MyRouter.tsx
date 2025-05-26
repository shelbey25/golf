import React, { Suspense, useEffect, useState } from "react";
import { ClerkProvider, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";

import { api } from "../../utils/api";

import { SafeAreaView, Text, View } from "react-native";
import tw from "twrnc";

import { useAppState } from "./RouteWrap";
import MainV2 from "./MainV2";
import Sessions from "./Sessions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./Loading";

const MyRouter = () => {
  
  const { mode, setMode } = useAppState();

  useEffect(() => {
    (async () => {
        const basic_info = await AsyncStorage.getItem('my_basic_info');
        console.log(basic_info)
        if (basic_info) {
          setMode("Main")
        } else {

        }
            
      
    })();
  }, []);
  
const override = false
if (override) {
  return <LoadingScreen />
}

  if (mode === 'INIT') {
    return <LoadingScreen />
  } if (mode === "Main") {
    return (
      <Suspense fallback={null}>
        <MainV2 />
      </Suspense>
    );
  } else {
    return null;
  }
};

export default MyRouter;
