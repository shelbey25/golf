import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import { api } from "../../utils/api";
import tw from "../../utils/tailwind";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CourseSelector = ({ onSelect, setActiveSession, setSessionStrokes, setStrokeCount, currentRoundInfo }: { onSelect: Function, setActiveSession: Function, setSessionStrokes: Function, setStrokeCount: Function, currentRoundInfo: any }) => {
    const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const { data: results } = api.courses.search.useQuery({ query });


  return (
  <View style={tw`flex-1 bg-stone-800 p-6 w-full h-full items-center justify-center`}>
    <View style={tw`rounded-2xl p-8 shadow-sm max-w-md w-full mx-auto`}>
      {/* Header */}
      <Text style={tw`text-2xl font-bold text-white mb-8 text-center`}>
        New Golf Session
      </Text>
  
      {/* Course Search - Static Version */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-white font-semibold mb-2`}>Select Course</Text>
        <View style={tw`relative`}>
          <TextInput
            style={tw`border-2 border-gray-300 p-4 rounded-xl bg-white text-gray-800 text-base`}
            placeholder="Search golf courses..."
            placeholderTextColor="#9CA3AF"
            value={query}
        onChangeText={setQuery}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
          />
          <Ionicons 
            name="search" 
            size={20} 
            color="#9CA3AF" 
            style={tw`absolute right-4 top-4`}
          />
        </View>
  
        {/* Sample Course Dropdown - Static */}
        <View style={tw`mt-2 border border-gray-200 rounded-xl bg-white shadow-md h-60`}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.course_id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
              onPress={() => {
                const par = item.holes.filter((hole) => hole.hole_number === 1)[0].par
                onSelect(item.name + ", Hole " + 1, par)
                setQuery(item.name)
                }}
              style={tw`p-4 ${index === (results ? results.length : 0) - 1 ? "" : "border-b border-gray-100"}`}>
                <Text style={tw`font-medium text-gray-800`}>{item.name}</Text>
                <Text style={tw`text-sm text-gray-500 mt-1`}>
                  {"London, England"}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
  
      {/* Start Button - Static Active State */}
      <TouchableOpacity 
        style={tw`w-full py-5 rounded-xl bg-stone-600 shadow-lg flex items-center justify-center`}
      
        onPress={() => {
          setActiveSession("true");
          AsyncStorage.setItem('active_session', 'true');
          AsyncStorage.setItem('stroke_count', '0');
          AsyncStorage.setItem('session_strokes', '');
          AsyncStorage.setItem('current_round_info', currentRoundInfo);
          
          setSessionStrokes("");
          setStrokeCount("0")
      }}
      >
        <Text style={tw`text-white font-bold text-lg`}>Start New Session</Text>
      </TouchableOpacity>
  
    </View>
  </View>)

};

export default CourseSelector;
