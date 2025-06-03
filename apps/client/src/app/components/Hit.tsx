import { View, Text, TouchableOpacity } from "react-native"
import tw from "../../utils/tailwind"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Location from 'expo-location';
import { api } from "../../utils/api";
import CourseSelector from "./CourseSelector";
import HitLogger from "./HitLogger";
import LoadingScreen from "./Loading";
import SessionMediaUpload from "./SubmitMedia";

type Hole = {
    courseId: string;
    hole_id: string;
    hole_number: number;
    par: number;
  };
  
  type Course = {
    course_id: string;
    name: string;
    holes: Hole[];
  };

const Hit = ({ }) => {

    const createRound = api.golf_session.createRound.useMutation();
    const {data: allCourses} = api.courses.getAll.useQuery();

    const [sessionCount, setSessionCount] = useState(0)
    const [my_id, set_my_id] = useState("")

    /*useEffect(() => {
         AsyncStorage.setItem('all_sessions', "")
    }, [])*/

    const updateMySessionInfo = async () => {
        const all_sessions = (await AsyncStorage.getItem('all_sessions'))?.split(/,\\\\|null\\\\/) || [];
        const seen = new Set<string>();
        const uniqueSessions = all_sessions.filter(session => {
        const key = session.split(",")[0];
        if (seen.has(key) || !key || key === "") return false;
        seen.add(key);
        return true;
        });
        setSessionCount(uniqueSessions.length + 1)
    }

    useEffect(() => {
        
        void (async () => {
            updateMySessionInfo()
            const my_info = await AsyncStorage.getItem('my_basic_info')
            set_my_id(my_info ? my_info.split("\\")[0] : "")
            
        })()
    }, [])

    
    

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
                //console.log(roundInfo)
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

    const [query, setQuery] = useState('');
    const queryHook = api.courses.getByName.useQuery(
    { query },
    { enabled: false }
    );

    const [currentCourse, setCurrentCourse] = useState<Course | null>(null)

    const updateCurrentCourseInfo = async () => {
        if (activeSession === "true") {
            const currentCourseName = currentRoundInfo.split(",")[1]
            setQuery(currentCourseName);

            await new Promise(resolve => setTimeout(resolve, 0)); // wait 1 tick

            const result = await queryHook.refetch();
            if (result.data) {
                setCurrentCourse(result.data)
            }
        }
    }


    useEffect(() => {updateCurrentCourseInfo()}, [])

    useEffect(() => {
        updateCurrentCourseInfo()
    }, [currentRoundInfo, currentCourse, activeSession])

    const [nextHoleIsLoading, setNextHoleIsLoading] = useState(false)


    const onNextHole = () => {
        void (async () => {
            setNextHoleIsLoading(true)
            const currentHole = parseInt(currentRoundInfo.split(",")[2].split(" ")[1])

            if (currentCourse !== null) {


            const holesOnCourse = currentCourse?.holes.length

            if (holesOnCourse && currentHole+1 <= holesOnCourse) {
                const session_strokes = await AsyncStorage.getItem('session_strokes');

            const holeId = currentCourse ? currentCourse.holes.filter((hole) => {
                return currentHole === hole.hole_number
            })[0].hole_id : ""

            const active_post = await AsyncStorage.getItem('active_post');

            await createRound.mutateAsync({
                round_name: currentRoundInfo.split(",")[0],
                hit_data: session_strokes ? session_strokes : "",
                golfer_id: my_id,
                hole_id: holeId,
                post_id: active_post || ""
            })
            const all_sessions = await AsyncStorage.getItem('all_sessions');
            if (all_sessions !== null) {
                await AsyncStorage.setItem('all_sessions', all_sessions + currentRoundInfo + "," + holeId + "," + session_strokes + "\\\\");
            } else {
                await AsyncStorage.setItem('all_sessions', currentRoundInfo + "," + holeId + "," + session_strokes + "\\\\");
            }
            updateMySessionInfo()

            const newCurrentRoundInfo = currentRoundInfo.split(",")[0] + "," + currentRoundInfo.split(",")[1] + ",Hole " + (currentHole + 1).toString() + "," +  currentCourse.holes.filter((hole) => {
                return (currentHole+1) === hole.hole_number
            })[0].par


            await AsyncStorage.setItem('current_round_info', newCurrentRoundInfo);
            setCurrentRoundInfo(newCurrentRoundInfo)

            AsyncStorage.setItem('stroke_count', '0');
            AsyncStorage.setItem('session_strokes', '');
            
            setSessionStrokes("");
            setStrokeCount("0")
            setNextHoleIsLoading(false)
            }
        }
        })()
    }

    const onStroke = () => {
        void (async () => {
            await AsyncStorage.setItem('stroke_count', (parseInt(strokeCount)+1).toString());
            setStrokeCount((parseInt(strokeCount)+1).toString())

            const location = await Location.getCurrentPositionAsync({});
            const new_coord_set = location?.coords.latitude + "," + location?.coords.longitude + ","
            setSessionStrokes(sessionStrokes + new_coord_set);
            AsyncStorage.setItem('session_strokes', sessionStrokes + new_coord_set);
        })()
    }

    const [uploadMedia, setUploadMedia] = useState(false)
    const [mostRecentRoundID, setMostRecentRoundID] = useState("")

    const onFinish = () => {
        setUploadMedia(true)
        setActiveSession("false");
        AsyncStorage.setItem('active_session', 'false');
        const currentHole = parseInt(currentRoundInfo.split(",")[2].split(" ")[1])
        void (async () => {
            const active_post = await AsyncStorage.getItem('active_post');
            const session_strokes = await AsyncStorage.getItem('session_strokes');
            const holeId = currentCourse ? currentCourse.holes.filter((hole) => {
                return currentHole === hole.hole_number
            })[0].hole_id : ""
            const round_info = await createRound.mutateAsync({
                round_name: currentRoundInfo.split(",")[0],
                hit_data: session_strokes ? session_strokes : "",
                golfer_id: my_id,
                hole_id: holeId,
                post_id: active_post || "",
            })
            setMostRecentRoundID(round_info.round_id)
            //need to make hole_id dynamic
            const all_sessions = await AsyncStorage.getItem('all_sessions');
            if (all_sessions !== null) {
                await AsyncStorage.setItem('all_sessions', all_sessions + currentRoundInfo + "," + holeId + "," + session_strokes + "\\\\");
            } else {
                await AsyncStorage.setItem('all_sessions', currentRoundInfo + "," + holeId + "," + session_strokes + "\\\\");
            }
            updateMySessionInfo()
        })()
    }

    const updateFlic = api.golf_session.addImg.useMutation()

    if (uploadMedia) {
        return <SessionMediaUpload 
        onSkip={() => {setUploadMedia(false)}}
        onComplete={()  => {
            setUploadMedia(false)
        }}
        round_id={mostRecentRoundID}
        />
    }

    

    return <GestureHandlerRootView style={tw`h-full flex flex-col justify-between  bg-stone-800 `}>
        {activeSession === "true" ? 
        
        <>
        {nextHoleIsLoading ? 
        <LoadingScreen />
        : <HitLogger 
        session_strokes={sessionStrokes}
        displayNext={(currentCourse && parseInt(currentRoundInfo.split(",")[2].split(" ")[1])+1 <= currentCourse.holes.length) || false} currentRoundInfo={currentRoundInfo} onFinish={onFinish} onStroke={onStroke} strokeCount={strokeCount} onNextHole={onNextHole} />}
        </>

        :

        <><CourseSelector onSelect={(course: any, par: any) => {
            setCurrentRoundInfo("Session " + sessionCount.toString() + "," + course.split(", ")[0] + "," + course.split(", ")[1] + "," + par)
          }}
          my_id={my_id}
          setActiveSession={setActiveSession} setSessionStrokes={setSessionStrokes} setStrokeCount={setStrokeCount} currentRoundInfo={currentRoundInfo}
          />
       </>
        
        }
    </GestureHandlerRootView>
}

export default Hit