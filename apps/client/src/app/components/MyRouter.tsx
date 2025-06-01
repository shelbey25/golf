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
import ProfilePhoto from "./ProfilePhoto";
import SignInScreen from "./SignIn";

async function resetAllKeysToNull() {
  try {
    const keys = await AsyncStorage.getAllKeys(); // get all keys

    // Create array of promises to set each key to 'null' (string)
    const resetPromises = keys.map(key => AsyncStorage.setItem(key, ''));

    await Promise.all(resetPromises); // wait for all to complete
    console.log('All keys reset to null');
  } catch (error) {
    console.error('Error resetting keys:', error);
  }
}

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
  return <SignInScreen />
}

  if (mode === 'INIT') {
    return <LoadingScreen />
  } else if (mode === "Account Creation") {
    return <CreateAccount />
} else if (mode === "SignIn") {
  return <SignInScreen />
} else if (mode === "Add PFP") {
  return <ProfilePhoto />
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
