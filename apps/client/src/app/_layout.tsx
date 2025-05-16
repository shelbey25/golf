import React, { Suspense } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "../utils/api";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Mansalva_400Regular } from '@expo-google-fonts/mansalva';
import { LondrinaOutline_400Regular } from '@expo-google-fonts/londrina-outline';
import { Castoro_400Regular } from '@expo-google-fonts/castoro';
import { Truculenta_400Regular } from '@expo-google-fonts/truculenta';
//import { } from '@expo-google-fonts/';
import { AnekOdia_400Regular} from '@expo-google-fonts/anek-odia';
import { Sono_400Regular } from '@expo-google-fonts/sono';
import { PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display'


import { View, Text, SafeAreaView } from "react-native";

// This is the main layout of the app
// It wraps your pages with the providers they need


const cLERK_PUBLISHABLE_KEY =
  "pk_test_Y29taWMtZm94LTI5LmNsZXJrLmFjY291bnRzLmRldiQ";
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
const RootLayout = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular, AnekOdia_400Regular, Sono_400Regular,
    Poppins_600SemiBold, Poppins_500Medium, Mansalva_400Regular, LondrinaOutline_400Regular, Castoro_400Regular, Truculenta_400Regular, PlayfairDisplay_400Regular
  });
  if (!fontsLoaded ) {
    return null;
  }
  return (
    <Suspense fallback={null}><ClerkProvider
      publishableKey={cLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <Suspense fallback={null}><TRPCProvider>      
      <Suspense fallback={null}><SafeAreaProvider >
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar />
      </SafeAreaProvider></Suspense>
      </TRPCProvider></Suspense>
      </ClerkProvider></Suspense>
  );
};

export default RootLayout;
