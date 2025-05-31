import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import LoadingScreen from './Loading';
import { api } from '../../utils/api';
type File = {
    uri: string;
    name: string;
    type: string;
}

const SessionMediaUpload = ({ onComplete, onSkip, round_id }: {onComplete: Function, onSkip: Function, round_id: string}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadRef = useRef(null);
  const [file, setFile] = useState<File | null>(null)

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

const updateFlic = api.golf_session.addImg.useMutation()


  const uploadMedia = async () => {
    if (!selectedImage || !file) return;
    
    setIsUploading(true);
    try {
      const image_key = await uploadToS3(file);
      await updateFlic.mutateAsync({
        img_key: image_key,
        round_id: round_id
      })
      onComplete();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>{isUploading ? <LoadingScreen /> : <View style={tw`h-full justify-start bg-stone-800 p-6 pt-16`}>
      {/* Header */}
      <View style={tw`mb-8`}>
        <Text style={[tw`text-3xl text-white font-bold text-center`, { fontFamily: 'PlayfairDisplay_400Regular' }]}>
          Session Complete
        </Text>
        <Text style={tw`text-stone-400 text-center mt-2`}>
          Would you like to add media from your round?
        </Text>
      </View>

      {/* Image Preview/Upload Area */}
      <TouchableOpacity 
        onPress={pickImage}
        style={tw`aspect-square w-full bg-stone-200 rounded-2xl border-2 border-dashed border-stone-400 items-center justify-center mb-6`}
        ref={uploadRef}
      >
        {selectedImage ? (
          <Image 
            source={{ uri: selectedImage }} 
            style={tw`w-full h-full rounded-2xl`}
            resizeMode="cover"
          />
        ) : (
          <View style={tw`items-center p-6 `}>
            <View style={tw`bg-stone-300 rounded-full p-4 mb-4`}>
              <Text style={tw`text-3xl text-stone-700`}>+</Text>
            </View>
            <Text style={tw`text-stone-700 font-medium`}>Tap to select photo</Text>
            <Text style={tw`text-stone-500 text-sm mt-1`}>Maximum 1 image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={tw`absolute bottom-8 left-6 flex w-full justify-center items-center`}>
      <View style={tw`flex-row justify-between mt-2 `}>
        <TouchableOpacity 
          onPress={() => {
            onSkip()
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
}</>
  );
};

export default SessionMediaUpload;