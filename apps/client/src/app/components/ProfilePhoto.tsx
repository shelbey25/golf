import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import { api } from '../../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppState } from './RouteWrap';
import LoadingScreen from './Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

type File = {
    uri: string;
    name: string;
    type: string;
}

const ProfilePhoto = ({  }) => {
const {setMode} = useAppState()
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const uploadRef = useRef(null);
    const [file, setFile] = useState<File | null>(null)

    const [user_id, set_user_id] = useState("")
    useEffect(() => {
        (async () => {
            const basic_info = await AsyncStorage.getItem('my_basic_info');
            if (basic_info) {
              set_user_id(basic_info.split("\\")[0])
            }
        })();
      }, []);
    
  
    const uploadToS3 = async (file: File) => {
        let img_key_saved = ""
        try {
          // 1. Get presigned URL from Next.js
          const presignRes = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              contentType: file.type,
            }),
          });
    
          const { url, fields, img_key } = await presignRes.json();
          img_key_saved = img_key
    
          // 2. Prepare form data
          const formData = new FormData();
          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
          });
          formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.type,
          } as any);
    
          // 3. Upload to S3
          const uploadRes = await fetch(url, {
            method: 'POST',
            body: formData,
          });
  
          if (!uploadRes.ok) throw new Error('Upload failed');
         // Alert.alert('Success!', 'Image uploaded to S3');
        } catch (error) {
          //Alert.alert('Error');
        } finally {
          return img_key_saved
        }
      };
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
  
      if (!result.canceled) {
          const file = {
            uri: result.assets[0].uri,
            name: result.assets[0].fileName || `image-${Date.now()}.jpg`,
            type: 'image/jpeg',
          };
          setSelectedImage(file.uri)
          setFile(file)
        }
    };
  
  const updateUserFlic = api.golf_user.updateImg.useMutation()
  
  
    const uploadMedia = async () => {
      if (!selectedImage || !file) return;
      
      setIsUploading(true);
      try {
        const image_key = await uploadToS3(file);
        await updateUserFlic.mutateAsync({
          img_key: image_key,
          user_id: user_id
        })
        setMode("Main")
      } finally {
        setIsUploading(false);
      }
    };

    if (isUploading) {
        return <LoadingScreen />
      }

  return (
    <View style={tw`flex-1 bg-stone-800 p-6 justify-center`}>
      <View style={tw`rounded-2xl p-8 shadow-sm`}>
        {/* Header */}
        <Text style={[tw`text-2xl font-bold text-white text-center `, { fontFamily: 'PlayfairDisplay_400Regular' }]}>
          Add Profile Photo
        </Text>
        <Text style={[tw`font-bold text-white text-center mb-8`, { fontFamily: 'PlayfairDisplay_400Regular' }]}>
          Click to Change From Default
        </Text>


        {/* Photo Preview */}
        <TouchableOpacity onPress={pickImage} style={tw`items-center mb-8`}>
          <View style={tw`items-center justify-center w-40 h-40 rounded-full bg-stone-200 border-2 ${!selectedImage ? 'border-stone-600' : 'border-stone-300'} overflow-hidden`}>
            {selectedImage ? (
              <Image 
                source={{ uri: selectedImage }} 
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
            ) : (
                <Icon name="user-circle" size={150} color="#888888" />

            )}
          </View>
        </TouchableOpacity>

       

        {/* Continue Button */}
        <View style={tw`flex-row justify-between mt-2 `}>
        <TouchableOpacity 
          onPress={() => {
            setMode("Main")
        }}
          style={tw`bg-stone-300 rounded-xl px-6 py-4 flex-1 mr-2 items-center`}
        >
          <Text style={tw`text-stone-800 font-bold`}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={uploadMedia}
          disabled={!selectedImage || isUploading}
          style={[
            tw`${selectedImage ? "bg-green-600" : "bg-slate-600"} rounded-xl px-6 py-4 flex-1 ml-2 items-center`,
            (!selectedImage || isUploading) && tw`opacity-70`
          ]}
        >
          {isUploading ? (
            <ActivityIndicator color="#f5f5f4" />
          ) : (
            <Text style={tw`text-stone-100 font-bold`}>Upload</Text>
          )}
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default ProfilePhoto;