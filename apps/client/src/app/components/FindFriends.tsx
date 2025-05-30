import { View, Text, TextInput, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { api } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppState } from './RouteWrap';
import useS3PresignedUrl from '../hooks/useS3PresignedUrl';
import useMultipleS3PresignedUrl from '../hooks/useMultipleS3PresignedUrl';

const FindFriends = ({ route, navigation }: {route: any, navigation: any}) => {
  const {setPreviewProfile, setPfpUrls} = useAppState()
    const [search, setSearch] = useState('');
  const [added, setAdded] = useState<string[]>([]);

  const opacity = useRef(new Animated.Value(0.6)).current;
  
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

  const [currentUserId, set_user_id] = useState("")
  
  const {data: suggestedUsers } = api.golf_user.getSimilarUsers.useQuery({ currentUserId: currentUserId, search: search})


  useEffect(() => {
    (async () => {
        const basic_info = await AsyncStorage.getItem('my_basic_info');
        if (basic_info) {
          set_user_id(basic_info.split("\\")[0])
        }
    })();
  }, []);

  const startFollowing = api.golf_user.startFollowing.useMutation()
  const stopFollowing = api.golf_user.removeFollowing.useMutation()

  const handleAdd = (id: string) => {
    if (added.includes(id)) {
        // Remove from added
        setAdded(added.filter(existingId => existingId !== id));
        stopFollowing.mutate({userMyId: currentUserId, userNewId: id})
      } else {
        // Add to list
        startFollowing.mutate({userMyId: currentUserId, userNewId: id})
        setAdded([...added, id]);
      }
  };

  const {data: myInfo, refetch: refetchMyInfo} = api.golf_user.getMyInfo.useQuery({
    my_id: currentUserId
  })

  useEffect(() => {
    refetchMyInfo()
  }, [currentUserId])

  useEffect(() => {
    const followingIds = myInfo?.following.map((following) => following.id)
    if (followingIds) {
      setAdded(prev => Array.from(new Set([...prev, ...followingIds])));
    }
  }, [myInfo])

  const { urls, loading, error, getPresignedUrl, clearUrls } = useMultipleS3PresignedUrl();

  const [isLoading, setIsLoading] = useState(false)

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
  const loadProfilePhotos = async () => {
    setIsLoading(true)
    if (!suggestedUsers) return;

    //Fix so maybe it is linked to the user id
    
    // Load all URLs in parallel
    await Promise.all(
      suggestedUsers.map(user => 
        getPresignedUrl(user.id, user.profilePhotoID)
      )
    );

  
    setIsLoading(false);


  };
  
  loadProfilePhotos();

}, [suggestedUsers]);



useEffect(() => {

  setPfpUrls(urls)
}, [urls])

  return (
    <View style={tw`flex-1 bg-stone-800 p-4 pt-16 pb-0`}>
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

    

      {suggestedUsers && !isLoading ? <FlatList
        data={suggestedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
          onPress={() => {
            setPreviewProfile(item)
            navigation.navigate("Profile Preview")
          }}
            style={tw`flex-row items-center justify-between bg-slate-200 rounded-xl px-4 py-3 mb-2`}
          >
            <View style={tw`flex flex-row items-center justify-center gap-x-2`}><View style={tw`h-8 rounded-full border border-white aspect-square`}>
            <Image
                source={{uri: urls[item.id]}}
                style={tw`w-full h-full rounded-full aspect-square`}
                resizeMode="cover"
              />
        </View>
            <Text style={tw`text-lg text-gray-800`}>{item.name}</Text></View>
            {added.includes(item.id) ? (
              <TouchableOpacity
              onPress={() => handleAdd(item.id)} style={tw`bg-slate-300 p-2 rounded-lg px-4`}>
                <Text style={tw`font-semibold text-black`}>Following</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
              onPress={() => handleAdd(item.id)} style={tw`bg-blue-600 p-2 rounded-lg px-4`}>
                <Text style={tw`font-semibold text-white`}>Follow</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      /> : 
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View
        
            style={tw`flex-row items-center justify-between bg-slate-200 rounded-xl px-4 py-3 mb-2`}
          >
            <View style={tw`flex flex-row items-center justify-center gap-x-2`}><Animated.View style={[tw`h-8 rounded-full bg-slate-400  aspect-square`, { opacity }]}>
            
        </Animated.View>
        <Animated.View style={[tw`h-8 w-40 rounded-lg bg-slate-400  `, { opacity }]}>
            
        </Animated.View>
         </View>
         <Animated.View style={[tw`h-8 w-20 rounded-lg bg-blue-500`, { opacity }]}>
            
            </Animated.View>
          </View>
        )}/>}
    </View>
  )
}

export default FindFriends