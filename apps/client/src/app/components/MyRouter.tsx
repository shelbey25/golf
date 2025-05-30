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
import CreateAccount from "./AccountCreation";
import UploadImageScreen from "./ImageUpload";
import ImageCall from "./ImageCall";
import SessionMediaUpload from "./SubmitMedia";
import UploadScreen from "./ImageUpload";

const MyRouter = () => {
  
  const { mode, setMode } = useAppState();

  useEffect(() => {
    (async () => {
        const basic_info = await AsyncStorage.getItem('my_basic_info');
        //console.log(basic_info)
        if (basic_info) {
          setMode("Main")
        } else {
          setMode("Account Creation")
        }
            
      
    })();
  }, []);
  
const override = false
if (override) {
  return <UploadScreen />
}

  if (mode === 'INIT') {
    return <LoadingScreen />
  } else if (mode === "Account Creation") {
    return <CreateAccount />
} else if (mode === "Main") {
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
