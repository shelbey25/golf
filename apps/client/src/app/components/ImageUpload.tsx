import { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadScreen() {
  const [uploading, setUploading] = useState(false);

  const uploadToS3 = async (file: { uri: string; name: string; type: string }) => {
    setUploading(true);
    
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

      const { url, fields } = await presignRes.json();

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
      Alert.alert('Success!', 'Image uploaded to S3');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const file = {
        uri: result.assets[0].uri,
        name: result.assets[0].fileName || `image-${Date.now()}.jpg`,
        type: 'image/jpeg',
      };
      await uploadToS3(file);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        title="Pick and Upload"
        onPress={pickImage}
        disabled={uploading}
      />
    </View>
  );
}