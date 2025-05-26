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
import Icon from 'react-native-vector-icons/Ionicons';

import { api } from "../../utils/api";
import { activefont, headerfont } from "../activefont";
import { useAppState } from "./RouteWrap";
import * as FileSystem from 'expo-file-system';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "./Sessions";


export type Coord = [number, number];

// Haversine distance between two lat/lon points in meters
function haversineDistance([lat1, lon1]: Coord, [lat2, lon2]: Coord): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371000; // Earth's radius in meters

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

// Convert meters to yards
function metersToYards(meters: number): number {
  return meters * 1.09361;
}

export function getLongestDistanceInYards(coords: Coord[]): number {
  let longestDistanceMeters = 0;

  for (let i = 0; i < coords.length - 1; i++) {
    const dist = haversineDistance(coords[i], coords[i + 1]);
    if (dist > longestDistanceMeters) {
      longestDistanceMeters = dist;
    }
  }

  return metersToYards(longestDistanceMeters);
}


const Profile = ({ route, navigation }: {route: any, navigation: any}) => {
  
  

  const { mode, setMode, club, setClub } = useAppState();
  const [user_id, set_user_id] = useState("")
  const [user_name, set_user_name] = useState("")

  const {data: myInfo} = api.golf_user.getMyInfo.useQuery({my_id: user_id,})

  useEffect(() => {
    (async () => {
        const basic_info = await AsyncStorage.getItem('my_basic_info');
        if (basic_info) {
          set_user_id(basic_info.split("\\")[0])
          set_user_name(basic_info.split("\\")[1])
        }
            
      
    })();
  }, []);


  const [allSessionInfo, set_AllSessionInfo] = useState<Session[]>([])

  function pairCoords(flatCoords: number[]): number[][] {
    const paired: number[][] = [];
    for (let i = 0; i < flatCoords.length; i += 2) {
      // Make sure there is a y coordinate for every x
      if (i + 1 < flatCoords.length) {
        paired.push([flatCoords[i], flatCoords[i + 1]]);
      }
    }
    return paired;
  }

  const [longestDrive, setLongestDrive] = useState(0);

  useEffect(() => {
    void (async () => {
      const all_sessions = (await AsyncStorage.getItem('all_sessions'))?.split(",\\\\") || [];
      let longestHit = 0;
      set_AllSessionInfo(all_sessions.map((session) => {
          if (session === null || session === "") {
            return null
          }
          const indexed_session = session.split(",")
          const pairedCoords = pairCoords(indexed_session.slice(5).map(s => Number(s)));
          
          const longSessionDist = getLongestDistanceInYards(pairedCoords as Coord[])
          if (longSessionDist > longestHit) {
            longestHit = longSessionDist
          }
          
          return {
            name: indexed_session[0],
            course: indexed_session[1],
            hole: indexed_session[2],
            par: indexed_session[3],
            holeId: indexed_session[4],
            hits: pairedCoords,
            date: new Date(), //this is broken
          }

      }).filter((result) => result !== null))
      setLongestDrive(longestHit)
    })()
  }, [])  

  const [avgStrokes, setAvgStrokes] = useState(0)
  const [avgStrokesVSPar, setAvgStrokesVSPar] = useState(0);
  const [eagles, setEagles] = useState(0);
  const [birdies, setBirdies] = useState(0);
  const [recentCourses, setRecentCourses] = useState<any[]>([]);

  useEffect(() => {
    let totalStrokes = 0;
    let totalPar = 0;
    let eaglesCount = 0;
    let birdiesCount = 0;

allSessionInfo.forEach((session) => {
  totalStrokes += session.hits.length;
  totalPar += parseInt(session.par);
  if (parseInt(session.par) - 1 === session.hits.length) {
    eaglesCount += 1
  }
  if (parseInt(session.par) - 2 === session.hits.length) {
    birdiesCount += 1
  }
});
setAvgStrokes(totalStrokes/allSessionInfo.length)
setAvgStrokesVSPar((totalStrokes-totalPar)/allSessionInfo.length)
setEagles(eaglesCount)
setBirdies(birdiesCount)

setRecentCourses(Array.from(new Set(allSessionInfo.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
).map((session) => session.course))).map((name) => ({ name })))

  }, [allSessionInfo])

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
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 24, color: "white" }}>{user_name}</Text>
        </View>
        <View style={tw`flex flex-row justify-center gap-x-16 w-full p-1 `}>
            <View style={tw`flex flex-col justify-center items-center`}>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>Followers</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>{myInfo?.followers.length}</Text>
            </View>
            <View style={tw`flex flex-col justify-center items-center`}>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>Following</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>{myInfo?.following.length}</Text>
            </View>
        </View>
      </View>
     
     
     <View style={tw`pb-4 w-full flex items-center justify-center`}>
              <View style={tw`w-[95%] bg-stone-600 rounded-2xl p-4 `}>
          <View style={tw`flex flex-row items-center mb-4`}>
            <Image
              source={require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")}
              style={tw`w-14 h-14 rounded-full mr-4`}
            />
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 22, color: "white" }}>
              My Golf Stats
            </Text>
          </View>

          <View style={tw`flex flex-row justify-between flex-wrap gap-y-2`}>
            <View style={tw`w-[48%]`}>
              <Text style={tw`text-white text-sm`}>Total Rounds</Text>
              <Text style={tw`text-white text-lg font-bold`}>{allSessionInfo.length}</Text>
            </View>
            <View style={tw`w-[48%]`}>
              <Text style={tw`text-white text-sm`}>Avg Score</Text>
              <Text style={tw`text-white text-lg font-bold`}>{avgStrokes} ({avgStrokesVSPar > 0 ? "+" + avgStrokesVSPar : avgStrokesVSPar})</Text>
            </View>
            <View style={tw`w-[48%]`}>
              <Text style={tw`text-white text-sm`}>Best Round</Text>
              <Text style={tw`text-white text-lg font-bold`}>FIX</Text>
            </View>
            <View style={tw`w-[48%]`}>
              <Text style={tw`text-white text-sm`}>Longest Drive</Text>
              <Text style={tw`text-white text-lg font-bold`}>{longestDrive} yds</Text>
            </View>
            <View style={tw`w-[48%]`}>
              <Text style={tw`text-white text-sm`}>Eagles</Text>
              <Text style={tw`text-white text-lg font-bold`}>{eagles}</Text>
            </View>
            <View style={tw`w-[48%]`}>
              <Text style={tw`text-white text-sm`}>Birdies</Text>
              <Text style={tw`text-white text-lg font-bold`}>{birdies}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={tw` w-full flex items-center justify-center`}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Sessions')}
        style={tw`w-[95%] flex-row items-center justify-between bg-stone-600 px-6 py-2 rounded-xl shadow-md mb-4`}
        activeOpacity={0.8}
      >
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 28, color: 'white' }}>
          My Sessions
        </Text>
        <Icon name="chevron-forward" size={28} color="white" />
      </TouchableOpacity>
      </View>
      <View style={tw`pb-4 w-full flex items-center justify-center`}>
      <View style={tw`w-[95%] bg-stone-600 p-2 rounded-lg`}>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 25, color: "white" }}>Recent Courses</Text>
        <FlatList
            data={recentCourses}
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
                  <View style={tw`w-full bg-slate-800 h-8 opacity-60`}></View>
                  <Text style={tw`absolute text-white pb-2`}>{item.name}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            )}
            keyExtractor={item => item.name}
        />
      </View>
      </View>
      <View style={tw`h-[16]`}></View>
      
    </ScrollView></GestureHandlerRootView>
  );
};

export default Profile;



