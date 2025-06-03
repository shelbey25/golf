import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
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
import MapView, { Marker, Polyline } from 'react-native-maps';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Need to make hole 1 auto load

type Rank = {
  me: Boolean;
  name: string;
  strokes: number;
}

const GolfClub = ({ }: {}) => {
  
  

  const { club, setClub } = useAppState();
  const [activeHole, setActiveHole] = useState(1);
  const [intializer, setInitializer] = useState(false);
  const [holeId, setHoleId] = useState("")
  const [leaders, setLeaders] = useState<Rank[]>([]);

  const [user_id, set_user_id] = useState("")
  useEffect(() => {
    (async () => {
        const basic_info = await AsyncStorage.getItem('my_basic_info');
        if (basic_info) {
          set_user_id(basic_info.split("\\")[0])
        }
      
    })();
  }, []);

  const {data: hole_scores, refetch: refetchCompetitors, isLoading: ranks_loading} = api.golf_user.getAllCompetitors.useQuery({my_id: user_id, hole_id: holeId});
  const {data: club_data} = api.courses.getSpecificCourse.useQuery({name: club },
    {onSuccess: (data) => {
      setInitializer(true)
    }},
  );

  useEffect(() => {
    if (club_data) {
      setHoleId(club_data.holes.filter((hole) => hole.hole_number === activeHole)[0].hole_id)
      refetchCompetitors()
    }
  }, [activeHole, intializer])

  useEffect(() => {
    if (hole_scores && hole_scores[0]) {
      const newLeaders: Rank[] = hole_scores[0].following.map((follower) => {
        const validRounds = follower.rounds.filter(
          (round) => round?.hit_data && round.hit_data.length > 0
        );
        
        const sortedRounds = validRounds.sort((a, b) => {
          const aLen = a.hit_data.split(",").length;
          const bLen = b.hit_data.split(",").length;
          return aLen - bLen;
        });
        
        const strokes = sortedRounds.length > 0
          ? Math.floor(sortedRounds[0].hit_data.split(",").length / 2)
          : -1; 
        return {
          me: false,
          name: follower.name,
          strokes: strokes,
        }
      })
      if (hole_scores[0].rounds.length > 0) {
          newLeaders.push({me: true,
            name: hole_scores[0].name,
            strokes: Math.floor((hole_scores[0].rounds.sort((round) => round.hit_data.split(",").length)[0].hit_data.split(",").length)/2)
        })
      }
      const sortedLeaders = newLeaders
        .filter(leader => leader.strokes !== -1)
        .sort((a, b) => a.strokes - b.strokes);
      setLeaders(sortedLeaders)
    }

  }, [hole_scores, club_data])

  useEffect(() => {
    console.log(club_data)
    console.log(leaders)
    console.log("HOLE: ")
    console.log(hole_scores)

  }, [leaders, hole_scores, club_data])

  return (
    <View style={tw`h-full flex flex-col justify-start  bg-stone-800 `}>
        <View style={tw`h-1/2`}>
            <ImageBackground
                    source={require("../../../assets/Great_Waters_at_Reynolds_Lake_Oconee_-_Oct_2019.jpg")}
                    style={tw`w-full h-full`}
                    resizeMode="cover"
                >
                <View style={tw`flex h-full w-full justify-center items-center bg-black opacity-60`}>
                </View>
            </ImageBackground>
            <View style={tw`flex h-full w-full items-center justify-center absolute`}>
                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 40, color: "white",}}>{club}</Text>
            </View>
            
        </View>
        <View style={tw`flex flex-row gap-x-2 items-center bg-white h-[8]`}>
            {club_data ? <FlatList
            data={club_data.holes}
            horizontal={true}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {setActiveHole(item.hole_number)}}>
                  <Text style={tw`underline text-blue-500 p-2 ${activeHole === item.hole_number ? "font-bold" : ""}`} key={item.hole_number}>
                    Hole {item.hole_number}
                  </Text>
                </TouchableOpacity>
            )}
            /> : 
            <FlatList
            data={Array.from({ length: 9 })}
            horizontal={true}
            style={tw` flex flex-row p-1`}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => (
              <View style={tw`pr-2`}><PulsingPlaceholder style={tw`w-12 bg-blue-500 h-6 rounded`} /></View>
            )}
          />
            }
        </View>
        <View style={tw`flex flex-1`}>
          {leaders && !ranks_loading ? 
            <FlatList
              data={leaders}
              keyExtractor={item => item.name + item.strokes}
              contentContainerStyle={tw`flex-grow `}
              renderItem={({ item, index }) => (
                <View style={tw`border-b flex flex-row items-center justify-between p-2 ${item.me ? "bg-slate-400" : "bg-slate-200"} `} >
                  <View style={tw`flex flex-row gap-x-2`}>
                    <Text style={{ fontFamily: '', fontSize: 30 }}>
                    {index+1 + ". " + item.name}
                    </Text>
                    <Image
                      source={require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")}
                      style={tw`w-10 h-10 rounded-full aspect-square`}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={{ fontFamily: '', fontSize: 30 }}>
                    {item.strokes}
                  </Text>
                  </View>
              )}
            />
          :
          <ScrollView style={tw`flex flex-grow w-full `}>
    {[...Array(5)].map((_, i) => (
      <View
        key={i}
        style={tw`flex flex-row justify-between items-center bg-slate-100 border-b p-4  `}
      >
        <View style={tw`flex flex-row gap-x-3 items-center`}>
        <PulsingPlaceholder style={tw`w-8 h-8 rounded`} />
        <PulsingPlaceholder style={tw`w-24 h-5 rounded`} />
        </View>
        <PulsingPlaceholder style={tw`w-10 h-5 rounded`} />
      </View>
    ))}
  </ScrollView>}
        </View>
    </View>
  );
};

export default GolfClub;

const PulsingPlaceholder = ({ style }: { style?: any }) => {
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[tw`bg-slate-300`, style, { opacity }]} />;
};