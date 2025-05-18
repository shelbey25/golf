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

import { api } from "../../utils/api";
import { activefont, headerfont } from "../activefont";
import { useAppState } from "./RouteWrap";
import * as FileSystem from 'expo-file-system';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const Profile = ({ route, navigation }: {route: any, navigation: any}) => {
  
  

  const { mode, setMode, club, setClub } = useAppState();

  const courses = [{name: "HighGate Golf Club"}, {name: "Other Golf Club"}, {name: "Misc Golf Club"}]


  return (
    <GestureHandlerRootView><ScrollView style={tw`bg-stone-800`}>
      <View style={tw`h-[80] w-full flex flex-col items-center justify-center pt-16`}>
          <TouchableOpacity style={tw`z-10 absolute left-4 top-16`} onPress={() => {navigation.navigate("Feed")}}>
            <Ionicons name="close-circle-outline" size={48} color="white" />
          </TouchableOpacity>
        <View style={tw`h-[50%] rounded-full border-4 border-white aspect-square`}>
            <Image
                source={require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")}
                style={tw`w-full h-full rounded-full aspect-square`}
                resizeMode="cover"
              />
        </View>
        <View style={tw`p-2`}>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 24, color: "white" }}>Justin Case</Text>
        </View>
        <View style={tw`flex flex-row justify-center gap-x-16 w-full p-1 `}>
            <View style={tw`flex flex-col justify-center items-center`}>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>Followers</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>100</Text>
            </View>
            <View style={tw`flex flex-col justify-center items-center`}>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>Following</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>100</Text>
            </View>
        </View>
      </View>
      <View style={tw`w-full p-4 pb-6`}>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 25, color: "white" }}>My Stats</Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>Longest Drive: </Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>Average Distance: </Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>Average Strokes: </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Sessions')} style={tw`h-[20] flex flex-row justify-between items-center w-full bg-slate-200 pl-8 pr-8`}>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 40 }}>My Sessions</Text>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 40 }}>{">"}</Text>
      </TouchableOpacity>
      <View style={tw`w-full p-4`}>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 25, color: "white" }}>Recent Courses</Text>
        <FlatList
            data={courses}
            horizontal={true}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setClub(item.name)
              navigation.navigate('Golf Club')
            }}  style={tw`p-2`}>
              <ImageBackground
                source={require("../../../assets/Great_Waters_at_Reynolds_Lake_Oconee_-_Oct_2019.jpg")}
                style={tw`h-[28] rounded-lg overflow-hidden aspect-4/3`}
                resizeMode="cover"
              >
                <View style={tw`flex h-full w-full justify-end items-center`}>
                  <View style={tw`w-full bg-white h-8 opacity-60`}></View>
                  <Text style={tw`absolute text-slate-800 pb-2`}>{item.name}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            )}
            keyExtractor={item => item.name}
        />
      </View>
      <View style={tw`h-[16]`}></View>
      
    </ScrollView></GestureHandlerRootView>
  );
};

export default Profile;



