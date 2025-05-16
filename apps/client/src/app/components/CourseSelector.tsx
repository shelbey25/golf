import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import { api } from "../../utils/api";
import tw from "../../utils/tailwind";


const CourseSelector = ({ onSelect }: { onSelect: Function }) => {
    const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const { data: results } = api.courses.search.useQuery({ query });

  return (
    <View style={tw`w-full `}>
      <TextInput
        style={tw`border p-2 rounded bg-white text-black`}
        placeholder="Search golf course and hole"
        placeholderTextColor="#9CA3AF"
        value={query}
        onChangeText={setQuery}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {results && isFocused && query && results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.course_id}
          renderItem={({ item }) => (
            <>
            {results[0].holes.slice(0, 4).map((hole) => (<TouchableOpacity
            key={item.name + ", Hole " + hole.hole_number}
            onPress={() => {
                const par = results[0].holes.filter((holeMini) => {
                    return hole.hole_number == holeMini.hole_number
                })[0].par
                onSelect(item.name + ", Hole " + hole.hole_number, par)
                setQuery(item.name + ", Hole " + hole.hole_number)
                }}>
              <Text style={tw`p-2 border-b`}>{item.name + ", Hole " + hole.hole_number}</Text>
            </TouchableOpacity>))}
            </>
          
            )}
        />
      )}
    </View>
  );
};

export default CourseSelector;
