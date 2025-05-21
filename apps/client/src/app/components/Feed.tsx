import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons } from '@expo/vector-icons';

import { api } from "../../utils/api";
import { activefont, headerfont } from "../activefont";
import { useAppState } from "./RouteWrap";
import * as FileSystem from 'expo-file-system';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const Feed = ({ route, navigation }: {route: any, navigation: any}) => {
  
  

  const { mode, setMode } = useAppState();

  const [activeScroll, setActiveScroll] = useState("friends");

  const posts = [
    {user: "John B", pfp: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg"), course: "Highgate Golf Club, Hole 1", photo: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")},
    {user: "John C", pfp: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg"), course: "Highgate Golf Club, Hole 1", photo: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")},
    {user: "John D", pfp: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg"), course: "Highgate Golf Club, Hole 1", photo: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")}
  ]
  

  return (
    <GestureHandlerRootView style={tw`h-full w-full `}>
      <View style={tw`h-full w-full flex flex-col bg-stone-800 `}>
        <View style={tw`absolute z-10 w-full flex flex-col h-[30] p-12 gap-y-4`}>
          <View style={tw`flex flex-row justify-between w-full`}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Find Friends")
            }}>
              <Ionicons name="people" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate("My Profile")
            }}>
              <Ionicons name="person-circle" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row justify-center w-full gap-x-4`}>
            <TouchableOpacity onPress={() => {
              setActiveScroll("friends")
            }}>
               <Text style={tw`text-xl ${"friends" === activeScroll ? "font-bold text-white" : "font-bold text-slate-400"} `}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setActiveScroll("discover")
            }}>
               <Text style={tw`text-xl ${"discover" === activeScroll ? "font-bold text-white" : "font-bold text-slate-400"} `}>Discover</Text>
            </TouchableOpacity>
          </View>

        </View>
        <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        style={tw` flex w-full`}
        renderItem={({ item }) => (
          <View style={tw`flex p-4 gap-y-2 w-full`}>
            <View style={tw`flex flex-row w-full gap-x-2 items-center`}>
              <Image
                source={require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")}
                style={tw`w-12 h-12 rounded-full aspect-square`}
                resizeMode="cover"
              />
              <View style={tw`flex flex-col`}>
                <Text style={tw`text-white text-lg font-bold`}>{item.user}</Text>
                <Text style={tw`text-white `}>{item.course}</Text>
              </View>
            </View>
            <View style={tw`w-full aspect-square`}>
              <Image
                source={require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")}
                style={tw`flex w-full h-full rounded-lg `}
                resizeMode="cover"
              />
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View style={tw`h-32`}>
          </View>
        }
        
      />

      </View>
    </GestureHandlerRootView>
  );
};//pt-12

export default Feed;
