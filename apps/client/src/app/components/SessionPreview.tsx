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
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Session = {
  name: string;
  course: string;
  hole: string;
  par: string;
  holeId: string;
  hits: number[][];
  date: Date;
}

const SessionPreview = ({ }: {}) => {
  
  //also need to make able to select other holes not in immediate suggested
  //maybe split dropdown and selector

  const { mode, setMode, allSessionInfoGlobal } = useAppState();

 

  return (
    <View style={tw`h-full flex flex-col justify-between  bg-stone-800 `}>
      <FlatList
      data={allSessionInfoGlobal}
      renderItem={({ item }) => (
        <>{item ?
        <View style={tw`p-4 justify-center items-center`}>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 25, color: "white" }}>{item.name}</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>{item.course}, {item.hole} {"(Par " + item.par + ")"}</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>{item.hits.length} Strokes</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>{item.date.toDateString()}</Text>
            <View style={tw`h-[4]`}></View>
            <MapView
                mapType="satellite"
                style={tw`w-full aspect-3/2 rounded-md`}
                initialRegion={{
                latitude: (item.hits[0][0]+item.hits[item.hits.length-1][0])/2, // Replace with the latitude of your golf course
                longitude: (item.hits[0][1]+item.hits[item.hits.length-1][1])/2, // Replace with the longitude of your golf course
                latitudeDelta: Math.abs(item.hits[0][0]-item.hits[item.hits.length-1][0])*1.2 > 0.001 ? Math.abs(item.hits[0][0]-item.hits[item.hits.length-1][0])*1.2 : 0.001,
                longitudeDelta: Math.abs(item.hits[0][1]-item.hits[item.hits.length-1][1])*1.2 > 0.001 ?  Math.abs(item.hits[0][1]-item.hits[item.hits.length-1][1])*1.2 : 0.001,
                }}
                scrollEnabled={false}   
                zoomEnabled={false}      
                pitchEnabled={false}   
                rotateEnabled={false}    
                showsUserLocation={false}
            >
                {item.hits.map((hit, index) => (
                    <Marker key={index} coordinate={{ latitude: hit[0], longitude: hit[1] }}>
                        <View style={tw`h-2 w-2 opacity-100 ${index == 0 ? "bg-red-500" : index == item.hits.length-1 ? "bg-green-500" : "bg-slate-900"} rounded-full`}></View>
                    </Marker>
                ))
                }
                <Polyline
                    coordinates={item.hits.map(hit => ({
                    latitude: hit[0],
                    longitude: hit[1],
                    }))}
                    strokeColor="#FFFFFF" // red line
                    strokeWidth={3}
                />
            </MapView>
        </View>
        : null}</>
      )}
      keyExtractor={item => item.name}
    />
    </View>
  );
};

export default SessionPreview;
