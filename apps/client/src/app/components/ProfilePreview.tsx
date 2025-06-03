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
import { Coord, getLongestDistanceInYards } from "./Profile";

const ProfilePreview = ({ route, navigation }: {route: any, navigation: any}) => {
  
  

  const { mode, setMode, club, setClub, previewProfile, setPreviewProfile, setAllSessionInfoGlobal, pfpUrls } = useAppState();
  const [user_id, set_user_id] = useState("")
  const [user_name, set_user_name] = useState("")

  const {data: myInfo} = api.golf_user.getMyInfoPreview.useQuery({my_id: user_id,})


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

  useEffect(() => {
    setAllSessionInfoGlobal(allSessionInfo)
  }, [allSessionInfo])

  useEffect(() => {
    (async () => {
        if (myInfo) {
            let longestHit = 0;

      set_AllSessionInfo(myInfo.rounds.map((round) => {
        const pairedCoords = pairCoords(round.hit_data.split(",").filter(s => s !== "" && s !== null).map(s => Number(s)))

        const longSessionDist = getLongestDistanceInYards(pairedCoords as Coord[])
          if (longSessionDist > longestHit) {
            longestHit = longSessionDist
          }
          return {
            name: round.round_name,
            course: round.hole.course.name,
            hole: "Hole " + round.hole.hole_number.toString(),
            par: round.hole.par.toString(),
            holeId: round.hole.hole_id,
            hits: pairCoords(round.hit_data.split(",").filter(s => s !== "" && s !== null).map(s => Number(s))),
            date: round.date,
          }
      }).filter((result) => result !== null))
      setLongestDrive(Math.floor(longestHit))

    }
            
      
    })();
  }, [myInfo]);

  useEffect(() => {
    void (async () => {
        set_user_id(previewProfile.id)
      
    })()
  }, [])  

  const [avgStrokes, setAvgStrokes] = useState(0)
  const [avgStrokesVSPar, setAvgStrokesVSPar] = useState(0);
  const [eagles, setEagles] = useState(0);
  const [birdies, setBirdies] = useState(0);
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
    const [longestDrive, setLongestDrive] = useState(0);
   const [bestRound, setBestRound] = useState("")

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

const combinedSessions =  Object.values(
  allSessionInfo.reduce((acc, session) => {
    const hitCount = session.hits.length;
    const parCount = parseInt(session.par);

    if (!acc[session.name]) {
      acc[session.name] = {
        ...session,
        totalHits: hitCount,
        parCount: parCount,
      };
    } else {
      acc[session.name].totalHits += hitCount;
      acc[session.name].parCount += parCount;
    }

    return acc;
  }, {} as Record<string, any>)
);

if (combinedSessions && combinedSessions.length > 0) {
const bestSession = combinedSessions.reduce((min, session) => {
  const diff = session.totalHits - session.parCount;
  const minDiff = min.totalHits - min.parCount;
  return diff < minDiff ? session : min;
});
setBestRound(bestSession.totalHits.toString() + " (" +  (bestSession.totalHits-bestSession.parCount).toString() + ")")
} else {
  setBestRound("0 (0)")
}


setAvgStrokes(combinedSessions.length > 0 ? totalStrokes/combinedSessions.length : 0)
setAvgStrokesVSPar(combinedSessions.length > 0 ? (totalStrokes-totalPar)/combinedSessions.length : 0)
setEagles(eaglesCount)
setBirdies(birdiesCount)

setRecentCourses(Array.from(new Set(allSessionInfo.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
).map((session) => session.course))).map((name) => ({ name })))

  }, [allSessionInfo])


  return (
    <GestureHandlerRootView><ScrollView style={tw`bg-stone-800`}>
      <View style={tw`h-[80] w-full flex flex-col items-center justify-center pt-16`}>
          <TouchableOpacity style={tw`z-10 absolute right-4 top-16`} onPress={() => {navigation.navigate("Find Friends")}}>
            <Ionicons name="close-circle-outline" size={48} color="white" />
          </TouchableOpacity>
        <View style={tw`h-[50%] rounded-full border-4 border-white aspect-square`}>
            <Image
                source={{uri: pfpUrls[previewProfile.id]}}
                style={tw`w-full h-full rounded-full aspect-square`}
                resizeMode="cover"
              />
        </View>
        <View style={tw`p-2`}>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 24, color: "white" }}>{previewProfile.name}</Text>
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
     
     {myInfo && allSessionInfo ?
     <><View style={tw`pb-4 w-full flex items-center justify-center`}>
              <View style={tw`w-[95%] bg-stone-600 rounded-2xl p-4 `}>
          <View style={tw`flex flex-row items-center mb-4`}>
            <Image
              source={{uri: pfpUrls[previewProfile.id]}}
              style={tw`w-14 h-14 rounded-full mr-4`}
            />
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 22, color: "white" }}>
              My Golf Stats
            </Text>
          </View>

          <View style={tw`flex flex-row justify-between flex-wrap gap-y-2`}>
            <View style={tw`w-[48%]`}>
              <Text style={tw`text-white text-sm`}>Total Rounds</Text>
              <Text style={tw`text-white text-lg font-bold`}>
              {Object.values(
  allSessionInfo.reduce((acc, session) => {
    if (!acc[session.name]) {
      acc[session.name] = session;
    }
    return acc;
  }, {} as Record<string, typeof allSessionInfo[0]>)
).length}
              </Text>
            </View>
            <View style={tw`w-[48%]`}>
              <Text style={tw`text-white text-sm`}>Avg Score</Text>
              <Text style={tw`text-white text-lg font-bold`}>
              {Math.round(avgStrokes*100)/100} ({Math.round(avgStrokesVSPar*100)/100 > 0 ? "+" + Math.round(avgStrokesVSPar*100)/100 : Math.round(avgStrokesVSPar*100)/100})
              </Text>
            </View>
            <View style={tw`w-[48%]`}>
              <Text style={tw`text-white text-sm`}>Best Round</Text>
              <Text style={tw`text-white text-lg font-bold`}>{bestRound}</Text>
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
        onPress={() => navigation.navigate('Sessions Preview')}
        style={tw`w-[95%] flex-row items-center justify-between bg-stone-600 px-6 py-2 rounded-xl shadow-md mb-4`}
        activeOpacity={0.8}
      >
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 28, color: 'white' }}>
          {myInfo?.name.split(" ")[0] ? myInfo?.name.split(" ")[0] + "\'s" : ""} Sessions
        </Text>
        <Icon name="chevron-forward" size={28} color="white" />
      </TouchableOpacity>
      </View>
      {recentCourses.length > 0 ? <View style={tw`pb-4 w-full flex items-center justify-center`}>
      <View style={tw`w-[95%] bg-stone-600 p-2 rounded-lg`}>
        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 25, color: "white" }}>Recent Courses</Text>
        {recentCourses.length > 0 ? <FlatList
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
        /> : 
        <Text style={{ fontFamily: '', paddingTop: 4, fontSize: 15, color: "white" }}>No Courses to Display</Text>
        }
      </View> 
      </View> : null }
      
      </>

      : null}
      <View style={tw`h-[16]`}></View>
      
    </ScrollView></GestureHandlerRootView>
  );
};

export default ProfilePreview;



