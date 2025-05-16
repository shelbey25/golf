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
import MapView, { Marker, Polyline } from 'react-native-maps';

const GolfClub = ({ }: {}) => {
  
  

  const { club, setClub } = useAppState();

  const {data: hole_scores} = api.golf_user.getAllCompetitors.useQuery({my_id: "cmamev4250000k41rp3vmpd4x", hole_id: "cmanofyrv0001eodv22t5xen2"});

  useEffect(() => {
    console.log(hole_scores)
    console.log(hole_scores ? hole_scores[0].rounds[0] : "")
    console.log(hole_scores ? hole_scores[0].following[0] : "")
  }, [hole_scores])

  const holes = ["Hole 1", "Hole 2", "Hole 3", "Hole 4", "Hole 5",]
  const [activeHole, setActiveHole] = useState("Hole 1")


  return (
    <View style={tw`h-full flex flex-col justify-start  bg-stone-300 `}>
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
        <View style={tw`flex flex-row gap-x-2 items-center bg-white`}>
            <FlatList
            data={holes}
            horizontal={true}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {setActiveHole(item)}}><Text style={tw`underline text-blue-500 p-2 ${activeHole === item ? "font-bold" : ""}`} key={item}>{item}</Text></TouchableOpacity>
            )}
            />
        </View>
    </View>
  );
};

export default GolfClub;
