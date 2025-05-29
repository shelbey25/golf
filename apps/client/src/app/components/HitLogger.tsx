import { View, Text, TouchableOpacity} from "react-native"
import tw from "../../utils/tailwind"


const HitLogger = ({currentRoundInfo, onFinish, onStroke, strokeCount}: {currentRoundInfo: any, onFinish: any, onStroke: any, strokeCount: string}) => {

    return <View style={tw`flex-1 bg-stone-800 p-4 h-full w-full justify-between items-center`}>
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
  <View style={tw`flex-row justify-between bg-white rounded-xl p-6 shadow-sm mb-4 w-full`}>
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


  {/* Action Buttons */}
  <View style={tw`justify-center w-full`}>
    <TouchableOpacity 
      onPress={() => {onStroke()}}
      style={tw`bg-blue-600 rounded-xl p-6 items-center justify-center mb-4 shadow-md`}
    >
      <Text style={tw`text-white text-xl font-bold`}>Log Stroke</Text>
    </TouchableOpacity>

    <View style={tw`flex-row justify-between`}>
      <TouchableOpacity 
        onPress={() => {onFinish()}}
        style={tw`bg-green-600 rounded-xl p-4 flex-1 mr-2 items-center justify-center shadow-md`}
      >
        <Text style={tw`text-white font-bold`}>Next Hole</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => {}}
        style={tw`bg-red-500 rounded-xl p-4 flex-1 ml-2 items-center justify-center shadow-md`}
      >
        <Text style={tw`text-white font-bold`}>Finish Session</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>
}

export default HitLogger