import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { ExpoRoot } from "expo-router";
//import * as SplashScreen from "expo-splash-screen";
import { useDeviceContext } from "twrnc";
import 'react-native-gesture-handler';

import tw from "./src/utils/tailwind";

//SplashScreen.preventAutoHideAsync();
//import {LogBox} from 'react-native';


// Ignore all log notifications
//LogBox.ignoreAllLogs();
// Must be exported or Fast Refresh won't update the context
//export
function App() {
  useDeviceContext(tw);
  const ctx = require.context("./src/app") as import("/Users/shelbe/swoop-final/apps/client/node_modules/expo-router/build/types").RequireContext;

  /*return (
    <View style={tw`p-8`}>
      <Text allowFontScaling={false} style={{ fontFamily: "Poppins", fontSize: 30 }}>Shelbe Yousey</Text>
      <Text allowFontScaling={false} style={{ fontSize: 30 }}>Shelbe Yousey</Text>
    </View>
  );*/

    return <ExpoRoot context={ctx} />;
  
}

registerRootComponent(App);
export default App;