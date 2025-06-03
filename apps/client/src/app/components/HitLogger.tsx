import { View, Text, TouchableOpacity} from "react-native"
import tw from "../../utils/tailwind"
import MapView, { Marker, Polyline } from "react-native-maps"
import { useEffect, useState } from "react"
import * as Location from 'expo-location';


const HitLogger = ({currentRoundInfo, onFinish, onStroke, strokeCount, onNextHole, displayNext, session_strokes }: {currentRoundInfo: any, onFinish: Function, onStroke: Function, strokeCount: string, onNextHole: Function, displayNext: boolean, session_strokes: string}) => {

  const usableSessionStrokes = () => {
    return session_strokes.split(',').filter((val) => val !== "").map(parseFloat)
    .reduce((acc: number[][], val, idx, arr) => {
      if (idx % 2 === 0 && idx + 1 < arr.length) {
        acc.push([val, arr[idx + 1]]);
      }
      return acc;
    }, []);
  }

  const [liveLocation, setLiveLocation] = useState<number[]>([])

useEffect(() => {
  void (async () => {
    const location = await Location.getCurrentPositionAsync({});
    setLiveLocation([location?.coords.latitude, location?.coords.longitude])
  })()
}, [])
              



    return <View style={tw`flex flex-1 bg-stone-800 p-4 h-full w-full justify-between items-center`}>
  {/* Session Header */}
  <View style={tw`w-full pt-16`}>
  <View style={tw`bg-white rounded-xl p-6 shadow-sm mb-4 items-center w-full`}>
    <Text style={[tw`text-2xl text-gray-800`, { fontFamily: 'PlayfairDisplay_400Regular' }]}>
      {currentRoundInfo.split(",")[0]}
    </Text>
    <Text style={[tw`text-xl text-gray-600 mt-2`, { fontFamily: 'PlayfairDisplay_400Regular' }]}>
      {currentRoundInfo.split(",")[1]}, {currentRoundInfo.split(",")[2]}
    </Text>
  </View>

  {/* Stroke Counter */}
  <View style={tw`flex-row justify-between bg-white rounded-xl p-6 shadow-sm w-full`}>
    <View style={tw`items-center`}>
      <Text style={tw`text-gray-500 font-medium`}>Par</Text>
      <Text style={tw`text-3xl font-bold text-gray-800`}>{currentRoundInfo.split(",")[3]}</Text>
    </View>
    <View style={tw`items-center`}>
      <Text style={tw`text-gray-500 font-medium`}>Strokes</Text>
      <Text style={tw`text-3xl font-bold text-gray-800`}>{strokeCount}</Text>
    </View>
  </View>
  </View>

{session_strokes ?
  <MapView
      mapType="satellite"
      style={tw`w-full aspect-3/2 rounded-md`}
      initialRegion={{
      latitude: (usableSessionStrokes()[0][0]+usableSessionStrokes()[usableSessionStrokes().length-1][0])/2, // Replace with the latitude of your golf course
      longitude: (usableSessionStrokes()[0][1]+usableSessionStrokes()[usableSessionStrokes().length-1][1])/2, // Replace with the longitude of your golf course
      latitudeDelta: Math.abs(usableSessionStrokes()[0][0]-usableSessionStrokes()[usableSessionStrokes().length-1][0])*1.2 > 0.001 ? Math.abs(usableSessionStrokes()[0][0]-usableSessionStrokes()[usableSessionStrokes().length-1][0])*1.2 : 0.001,
      longitudeDelta: Math.abs(usableSessionStrokes()[0][1]-usableSessionStrokes()[usableSessionStrokes().length-1][1])*1.2 > 0.001 ?  Math.abs(usableSessionStrokes()[0][1]-usableSessionStrokes()[usableSessionStrokes().length-1][1])*1.2 : 0.001,
      }}
      scrollEnabled={false}   
      zoomEnabled={false}      
      pitchEnabled={false}   
      rotateEnabled={false}    
      showsUserLocation={false}
  >
      {usableSessionStrokes().map((hit, index) => (
          <Marker key={index} coordinate={{ latitude: hit[0], longitude: hit[1] }}>
              <View style={tw`h-2 w-2 opacity-100 ${index == 0 ? "bg-red-500" : index == usableSessionStrokes().length-1 ? "bg-green-500" : "bg-slate-900"} rounded-full`}></View>
          </Marker>
      ))
      }
      <Polyline
          coordinates={usableSessionStrokes().map(hit => ({
          latitude: hit[0],
          longitude: hit[1],
          }))}
          strokeColor="#FFFFFF" // red line
          strokeWidth={3}
      />
  </MapView>

  : <>{liveLocation ? <MapView
  style={tw`w-full aspect-3/2 rounded-md`}
  initialRegion={{
    latitude: liveLocation[0], // Replace with the latitude of your golf course
    longitude: liveLocation[1], // Replace with the longitude of your golf course
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    }}
    scrollEnabled={false}   
    zoomEnabled={false}      
    pitchEnabled={false}   
    rotateEnabled={false}    
    showsUserLocation={false}
>
  <Marker coordinate={{ latitude: liveLocation[0], longitude: liveLocation[1] }} />
</MapView>

: null}</>}


  {/* Action Buttons */}
  <View style={tw`justify-center w-full`}>
    <TouchableOpacity 
      onPress={() => {onStroke()}}
      style={tw`bg-blue-600 rounded-xl p-6 items-center justify-center mb-4 shadow-md`}
    >
      <Text style={tw`text-white text-xl font-bold`}>Log Stroke</Text>
    </TouchableOpacity>

    <View style={tw`flex-row justify-between`}>
      {displayNext ? <TouchableOpacity 
        onPress={() => {onNextHole()}}
        disabled={strokeCount == "0"}
        style={tw`${strokeCount == "0" ? "bg-stone-600" : "bg-green-600"} rounded-xl p-4 flex-1 mr-2 items-center justify-center shadow-md`}
      >
        <Text style={tw`text-white font-bold`}>Next Hole</Text>
      </TouchableOpacity> : null}
      
      <TouchableOpacity 
        onPress={() => {onFinish()}}
        disabled={strokeCount == "0"}
        style={tw`${strokeCount == "0" ? "bg-stone-600" : "bg-red-500"}  rounded-xl p-4 flex-1 ${displayNext ? "ml-2" : ""} items-center justify-center shadow-md`}
        
      >
        <Text style={tw`text-white font-bold`}>Finish Session</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>
}

export default HitLogger