import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { ExpoRoot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useDeviceContext } from "twrnc";
import 'react-native-gesture-handler';

import tw from "./src/utils/tailwind";
import LoadingScreen from "./src/app/components/Loading";

//SplashScreen.preventAutoHideAsync();

function App() {
  useDeviceContext(tw);
  const ctx = require.context("./src/app") as import("/Users/shelbe/swoop-final/apps/client/node_modules/expo-router/build/types").RequireContext;
  

    return <ExpoRoot context={ctx} />;
  
}

registerRootComponent(App);
export default App;