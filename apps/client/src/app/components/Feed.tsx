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
import { Ionicons } from '@expo/vector-icons';

import { api } from "../../utils/api";
import { activefont, headerfont } from "../activefont";
import { useAppState } from "./RouteWrap";
import * as FileSystem from 'expo-file-system';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useMultipleS3PresignedUrl from "../hooks/useMultipleS3PresignedUrl";
import MapView, { Marker, Polyline } from "react-native-maps";
import LoadingScreen from "./Loading";

const Feed = ({ route, navigation }: {route: any, navigation: any}) => {
  
  

  const { mode, setMode } = useAppState();

    const [user_id, set_user_id] = useState("")
    const [lastPostId, setLastPostId] = useState("")

  const [loadedPosts, setLoadedPosts] = useState<any[]>([])

  const {data: explorePosts, refetch: refetchPosts} = api.golf_rounds.getAllPosts.useQuery({
    user_id: user_id,
    lastPostId: lastPostId
  })

    const { urls, loading, error, getPresignedUrl, clearUrls } = useMultipleS3PresignedUrl();
  
    const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadProfilePhotos = async () => {
      

    if (!loadedPosts) return;

    //Fix so maybe it is linked to the user id
    
    // Load all URLs in parallel
    await Promise.all(
      loadedPosts.flatMap(post => [
        getPresignedUrl(post.user_id, post.photo_key),
        getPresignedUrl(post.id, post.photo)
      ]
      )
    );
  }

  void (async () => {
  setIsLoading(true)
  loadProfilePhotos()
  setIsLoading(false)
  })()


}, [loadedPosts])


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
     if (explorePosts) {
      const reshapedExplorePosts = explorePosts.map((post) => {
        return {
          date: post.date,
          photo: post.photo,
          holes: post.rounds.map((round) => 
            ({
              hits: pairCoords(round.hit_data.split(",").filter((s: string) => s !== "" && s !== null).map((s: string) => Number(s)))
            })
          ),
          id: post.id,
          photo_key: post.user.profilePhotoID,
          user_name: post.user.name,
          user_id: post.user.id,
          course_name: post.rounds[0].hole.course.name,
          top_hole: post.rounds.reduce((max, round) => {
            return round.hole.hole_number > max.hole_number ? round : max;
          }, post.rounds[0]).hole.hole_number
        }
      })
      console.log(reshapedExplorePosts)
      setLoadedPosts(reshapedExplorePosts)
     }
  }, [explorePosts])

  useEffect(() => {
    (async () => {
        const basic_info = await AsyncStorage.getItem('my_basic_info');
        if (basic_info) {
          set_user_id(basic_info.split("\\")[0])
        }
    })();
  }, []);

  const [activeScroll, setActiveScroll] = useState("friends");

  /*const posts = [
    {user: "John B", pfp: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg"), course: "Highgate Golf Club, Hole 1", photo: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")},
    {user: "John C", pfp: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg"), course: "Highgate Golf Club, Hole 1", photo: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")},
    {user: "John D", pfp: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg"), course: "Highgate Golf Club, Hole 1", photo: require("../../../assets/HS.07.19.23.SH.SHC2341.jpeg")}
  ]*/

    const [activeIndices, setActiveIndices] = useState<{ [key: number]: number }>({});
  const handleInnerScroll = (outerIndex: number, e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const innerIndex = Math.round(
      e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
    );
    setActiveIndices(prev => ({ ...prev, [outerIndex]: innerIndex }));
  };

  

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
        {loadedPosts && loadedPosts.length > 0 && !isLoading ? <FlatList
        data={loadedPosts}
        showsVerticalScrollIndicator={false}

        keyExtractor={(item, index) => index.toString()}
        style={tw` flex w-full`}
        renderItem={({ item, index: outerIndex }) => (
          <View style={tw`flex p-4 gap-y-2 w-full`}>
            <View style={tw`flex flex-row w-full gap-x-2 items-center`}>
              <Image
                source={{uri: urls[item.user_id]}}
                style={tw`w-12 h-12 rounded-full aspect-square`}
                resizeMode="cover"
              />
              <View style={tw`flex flex-col`}>
                <Text style={tw`text-white text-lg font-bold`}>{item.user_name}</Text>
                <Text style={tw`text-white `}>{item.course_name}</Text>
              </View>
            </View>
            
            
            <FlatList
                        style={tw`w-90`}
              data={[{isImage: true}, ...item.holes]}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, innerIndex) => innerIndex.toString()}
              onScroll={e => handleInnerScroll(outerIndex, e)}
              renderItem={({ item: smItem, index: innerIndex }) => {
                if (innerIndex === 0) { // First item is the image
                  return (
                    <View style={tw`w-90 aspect-square rounded-md bg-gray-200 justify-center items-center`}>
                     <Image
                source={{uri: urls[item.id]}}
                style={tw`flex w-full h-full rounded-md `}
                resizeMode="cover"
              />
                    </View>
                  );
                }


                return (<MapView
                            mapType="satellite"
                            style={tw`w-90 aspect-square rounded-md`}
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
                        </MapView>)
                      
                      
              }} />


                     <View style={tw`flex-row justify-center absolute bottom-7 w-full items-center right-4`}>  
                        <View style={tw`flex-row justify-center bg-stone-600 p-2 rounded-lg opacity-100`}>
        {(new Array(item.holes.length + 1).fill("Nish")).map((_, i) => (
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







          </View>
        )}
        ListHeaderComponent={
          <View style={tw`h-32`}>
          </View>
        }
        
      /> : <LoadingScreen/>}

      </View>
    </GestureHandlerRootView>
  );
};//pt-12

export default Feed;
