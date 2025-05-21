import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const mockProfiles = [
  { id: '1', name: 'Tiger Woods' },
  { id: '2', name: 'Rory McIlroy' },
  { id: '3', name: 'Shelbe Johnson' },
  { id: '4', name: 'Nelly Korda' },
];

const FindFriends = ({ route, navigation }: {route: any, navigation: any}) => {
    const [search, setSearch] = useState('');
  const [added, setAdded] = useState<string[]>([]);

  const filtered = mockProfiles.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (id: string) => {
    if (added.includes(id)) {
        // Remove from added
        setAdded(added.filter(existingId => existingId !== id));
      } else {
        // Add to list
        setAdded([...added, id]);
      }
  };

  return (
    <View style={tw`flex-1 bg-stone-800 p-4 pt-16`}>
      {/* Header */}
      <View style={tw`flex flex-row w-full justify-between items-center`}>
      <Text style={tw`text-3xl font-bold text-white mb-4`}>Find Friends</Text>
      <TouchableOpacity style={tw`z-10 mb-4`} onPress={() => {navigation.navigate("Feed")}}>
            <Ionicons name="close-circle-outline" size={40} color="white" />
          </TouchableOpacity>
          </View>

      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mb-4`}>
        <Ionicons name="search" size={20} color="#9ca3af" style={tw`mr-2`} />
        <TextInput
          placeholder="Search profiles..."
          placeholderTextColor="#9ca3af"
          style={tw`flex-1 text-base text-gray-800`}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Profile List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleAdd(item.id)}
            style={tw`flex-row items-center justify-between bg-slate-200 rounded-xl px-4 py-3 mb-2`}
          >
            <Text style={tw`text-lg text-gray-800`}>{item.name}</Text>
            {added.includes(item.id) ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : (
              <Ionicons name="add-circle-outline" size={24} color="gray" />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default FindFriends