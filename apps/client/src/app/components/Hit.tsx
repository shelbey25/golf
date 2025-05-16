import { View, Text, TouchableOpacity } from "react-native"
import tw from "../../utils/tailwind"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Location from 'expo-location';
import { api } from "../../utils/api";
import CourseSelector from "./CourseSelector";


const Hit = ({ }) => {

    const createRound = api.golf_session.createRound.useMutation();
    const {data: allCourses} = api.courses.getAll.useQuery();

    const [currentRoundInfo, setCurrentRoundInfo] = useState("Session 1,Highgate Golf Club,Hole 1,5,")

    useEffect(() => {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            AsyncStorage.setItem('location_permission', 'false');
            return;
          } 
    
          AsyncStorage.setItem('location_permission', 'true');
          
        })();
      }, []);

    const [activeSession, setActiveSession] = useState("")
    const [strokeCount, setStrokeCount] = useState("")
    const [sessionStrokes, setSessionStrokes] = useState("")

    useEffect(() => {
        void (async () => {
            const active_session = await AsyncStorage.getItem('active_session');
            if (active_session === null) {
                await AsyncStorage.setItem('active_session', 'false');
                setActiveSession("false")
            } else {
                setActiveSession(active_session)
            }

            const stroke_count = await AsyncStorage.getItem('stroke_count');
            if (stroke_count === null) {
                await AsyncStorage.setItem('stroke_count', '0');
                setStrokeCount("0")
            } else {
                setStrokeCount(stroke_count)
            }

            const roundInfo = await AsyncStorage.getItem('current_round_info');
            if (roundInfo === null) {
                await AsyncStorage.setItem('current_round_info', "");
                setCurrentRoundInfo("")
            } else {
                setCurrentRoundInfo(roundInfo)
            }
        })()
    }, [])


    useEffect(() => {
        void (async () => {
            const session_strokes = await AsyncStorage.getItem('session_strokes');
            setSessionStrokes(session_strokes || "")
        })()
    }, [])
    



    return <GestureHandlerRootView style={tw`h-full flex flex-col justify-between  bg-stone-300 `}>
        {activeSession === "true" ? 
        
        <View style={tw`flex flex-col h-full w-full items-center justify-center`}>
            <View style={tw`flex flex-col h-4/5 w-full items-center justify-center pt-16`}>
                <View style={tw`flex-col w-full gap-x-4 h-1/8 p-4 pb-2 items-center justify-center`}>
                    <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 25 }}>{currentRoundInfo.split(",")[0]}</Text>
                    <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 20 }}>{currentRoundInfo.split(",")[1] + ", " + currentRoundInfo.split(",")[2]}</Text>
                </View>
                <View style={tw`flex-row w-full h-1/2 p-4 pb-2 items-center justify-center`}>
                    <TouchableOpacity 
                    onPress={() => {
                        void (async () => {
                            await AsyncStorage.setItem('stroke_count', (parseInt(strokeCount)+1).toString());
                            setStrokeCount((parseInt(strokeCount)+1).toString())

                            const location = await Location.getCurrentPositionAsync({});
                            const new_coord_set = location?.coords.latitude + "," + location?.coords.longitude + ","
                            setSessionStrokes(sessionStrokes + new_coord_set);
                            AsyncStorage.setItem('session_strokes', sessionStrokes + new_coord_set);
                        })()
                    }}
                    style={tw`flex h-full aspect-square bg-blue-300 rounded-lg items-center justify-center`}>
                        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 25 }}>Log Stroke</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`flex-row w-full gap-x-4 h-3/8 p-4 pb-2 items-center justify-center`}>
                    <Text>
                        Par: {currentRoundInfo.split(",")[3]}
                    </Text>
                    <Text>
                        {"Stokes: " + strokeCount}
                    </Text>
                </View>
            </View>
            <View style={tw`flex h-1/5 w-full items-center justify-center`}>
                <TouchableOpacity onPress={() => {
                    setActiveSession("false");
                    AsyncStorage.setItem('active_session', 'false');
                    void (async () => {
                        const session_strokes = await AsyncStorage.getItem('session_strokes');
                        await createRound.mutateAsync({
                            round_name: currentRoundInfo.split(",")[0],
                            hit_data: session_strokes ? session_strokes : "",
                            golfer_id: "cmamev4250000k41rp3vmpd4x",
                            hole_id: "cmanofyrv0001eodv22t5xen2",
                        })
                        //need to make hole_id dynamic
                        const all_sessions = await AsyncStorage.getItem('all_sessions');
                        if (all_sessions !== null) {
                            AsyncStorage.setItem('all_sessions', all_sessions + currentRoundInfo + "," + "cmanofyrv0001eodv22t5xen2" + "," + session_strokes + "\\\\");
                        } else {
                            AsyncStorage.setItem('all_sessions', currentRoundInfo + "," + "cmanofyrv0001eodv22t5xen2" + "," + session_strokes + "\\\\");
                        }
                    })()
                }} style={tw`p-4 bg-white border border-black rounded-lg`}>
                    <Text>Finish Session</Text>
                </TouchableOpacity>
            </View>
        </View>

        :

        <View style={tw`flex h-full w-full items-center justify-center gap-y-8`}>
            <View style={tw`w-4/5`}><CourseSelector onSelect={(course: any, par: any) => {
    setCurrentRoundInfo("Session 1," + course.split(", ")[0] + "," + course.split(", ")[1] + "," + par)
  }}/></View>
            <TouchableOpacity onPress={() => {
                setActiveSession("true");
                AsyncStorage.setItem('active_session', 'true');
                AsyncStorage.setItem('stroke_count', '0');
                AsyncStorage.setItem('session_strokes', '');
                AsyncStorage.setItem('current_round_info', currentRoundInfo);
                
                setSessionStrokes("");
                setStrokeCount("0")
            }} style={tw`p-4 bg-white border border-black rounded-lg`}>
                <Text>Start New Session</Text>
            </TouchableOpacity>
        </View>
        
        }
    </GestureHandlerRootView>
}

export default Hit