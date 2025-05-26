import React, { Suspense } from "react";
import { Image, View } from "react-native";
import tw from "twrnc";

import { api } from "../../utils/api";
import 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PagerView from 'react-native-pager-view';

import Feed from "./Feed";
import Profile from "./Profile";
import Hit from "./Hit";
import FeedRouter from "./FeedRouter";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";


const Tab = createMaterialTopTabNavigator();
const MainV2 = ({

}: {
}) => {

  return (
    <Suspense fallback={null}><PagerView style={tw`w-full h-full`}><Tab.Navigator
      initialRouteName={"Match"}
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          const baseStyle = `h-6 w-6 rounded-full`;
  if (route.name === "FeedBase") {
    return (
      <FontAwesome5 name="home" size={20} color={focused ? "#111111" : "#666666"} />
    );
  } else if (route.name === "Hit") {
    return (
      <FontAwesome5 name="golf-ball" size={20} color={focused ? "#111111" : "#666666"} />
    );
  } else {
    return <View style={tw`${baseStyle} bg-black`} />;
  }
        },
        tabBarIndicator: () => {
          return null;
        },
        swipeEnabled: false,
        tabBarIndicatorContainerStyle: tw``,
        tabBarContentContainerStyle: tw`p-0 gap-x-0 border-0 `,
      })}
    >
      <Tab.Screen name="FeedBase" component={FeedRouter} />
      <Tab.Screen
        name="Hit"
        component={Hit}
      />

      
    </Tab.Navigator>
    </PagerView></Suspense>
  );
};

export default MainV2;
