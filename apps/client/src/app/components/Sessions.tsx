import React, { useEffect, useState } from "react";
import {
    FlatList,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
  imageId: string;
}

type GroupedSession = {
  name: string;
  sessions: any[];
}

const Sessions = ({ }: {}) => {
  
  //also need to make able to select other holes not in immediate suggested
  //maybe split dropdown and selector

  const { mode, setMode } = useAppState();

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
    void (async () => {
      const all_sessions = (await AsyncStorage.getItem('all_sessions'))?.split(/,\\\\|null\\\\/) || [];
      set_AllSessionInfo(all_sessions.map((session) => {
          if (session === null || session === "") {
            return null
          }
          const indexed_session = session.split(",")
          return {
            name: indexed_session[0],
            course: indexed_session[1],
            hole: indexed_session[2],
            par: indexed_session[3],
            holeId: indexed_session[4],
            hits: pairCoords(indexed_session.slice(5).map(s => Number(s))),
            date: new Date(),
            imageId: "", //add image ID
          }
      }).filter((result) => result !== null))
    })()
  }, [])  

  const [groupedInfo, setGroupedInfo] = useState<GroupedSession[]>([])
  useEffect(() =>
  {
    const grouped = Object.entries(allSessionInfo.reduce((acc, session) => {
      const key = session.name;
    
      if (!acc[key]) {
        acc[key] = [];
      }
    
      acc[key].push(session);
    
      return acc;
    }, {} as Record<string, typeof allSessionInfo>)).map(([name, sessions]) => ({ name, sessions }));

    setGroupedInfo(grouped)
  }, [allSessionInfo])

  console.log(groupedInfo[0].sessions[0])
const [activeIndices, setActiveIndices] = useState<{ [key: number]: number }>({});
const handleInnerScroll = (outerIndex: number, e: NativeSyntheticEvent<NativeScrollEvent>) => {
  const innerIndex = Math.round(
    e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
  );
  setActiveIndices(prev => ({ ...prev, [outerIndex]: innerIndex }));
};

  return (
    <View style={tw`h-full flex flex-col justify-between  bg-stone-800 `}>
      <FlatList
      data={groupedInfo}
      keyExtractor={(_, outerIndex) => outerIndex.toString()}
      renderItem={({ item, index: outerIndex }) => (
        <>{item ?
        <View style={tw`p-4 justify-center items-center`}>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 25, color: "white" }}>{item.name}</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>{item.sessions[0].course}, {item.sessions[0].hole} {"(Par " + item.sessions[0].par + ")"}</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>{item.sessions[0].hits.length} Strokes</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 16, color: "white" }}>{item.sessions[0].date.toDateString()}</Text>
            <View style={tw`h-[4]`}></View>
            
            
            <FlatList
            style={tw`w-80`}
  data={item.sessions}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  keyExtractor={(_, innerIndex) => innerIndex.toString()}
  onScroll={e => handleInnerScroll(outerIndex, e)}
  renderItem={({ item: smItem }) => (
  <MapView
                mapType="satellite"
                style={tw`w-80 aspect-square rounded-md`}
                initialRegion={{
                latitude: (smItem.hits[0][0]+smItem.hits[smItem.hits.length-1][0])/2, // Replace with the latitude of your golf course
                longitude: (smItem.hits[0][1]+smItem.hits[smItem.hits.length-1][1])/2, // Replace with the longitude of your golf course
                latitudeDelta: Math.abs(smItem.hits[0][0]-smItem.hits[smItem.hits.length-1][0])*1.2 > 0.001 ? Math.abs(smItem.hits[0][0]-smItem.hits[smItem.hits.length-1][0])*1.2 : 0.001,
                longitudeDelta: Math.abs(smItem.hits[0][1]-smItem.hits[smItem.hits.length-1][1])*1.2 > 0.001 ?  Math.abs(smItem.hits[0][1]-smItem.hits[smItem.hits.length-1][1])*1.2 : 0.001,
                }}
                scrollEnabled={false}   
                zoomEnabled={false}      
                pitchEnabled={false}   
                rotateEnabled={false}    
                showsUserLocation={false}
            >
                {smItem.hits.map((hit: any, index: number) => (
                    <Marker key={index} coordinate={{ latitude: hit[0], longitude: hit[1] }}>
                        <View style={tw`h-2 w-2 ${index == 0 ? "bg-red-500" : index == smItem.hits.length-1 ? "bg-green-500" : "bg-slate-900"} rounded-full`}></View>
                    </Marker>
                ))
                }
                <Polyline
                    coordinates={smItem.hits.map((hit: any) => ({
                    latitude: hit[0],
                    longitude: hit[1],
                    }))}
                    strokeColor="#FFFFFF" // red line
                    strokeWidth={3}
                />
            </MapView>)} />


            <View style={tw`flex-row justify-center absolute bottom-7 bg-stone-600 p-2 rounded-lg opacity-100`}>
        {item.sessions.map((_, i) => (
          <View
            key={i}
            style={tw`h-2 w-2 rounded-full mx-1 ${
              (activeIndices[outerIndex] ?? 0) === i
                ? 'bg-blue-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </View>


        </View>
        : null}</>
      )}
      
    />
      {/*<FlatList
      data={allSessionInfo}
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
                        <View style={tw`h-2 w-2 ${index == 0 ? "bg-red-500" : index == item.hits.length-1 ? "bg-green-500" : "bg-slate-900"} rounded-full`}></View>
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
      keyExtractor={item => item.name + " " + item.holeId}
    />*/}
    </View>
  );
};

export default Sessions;
