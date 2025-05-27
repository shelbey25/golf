import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Text } from 'react-native';
import { useState } from 'react';
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { api } from '../../utils/api';


export default function UploadImageScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);



  const uploadFile = async (fileUri: string, fileName: string, mimeType: string) => {
    const formData = new FormData();
formData.append('file', {
  uri: fileUri,
  name: fileName,
  type: mimeType || 'application/octet-stream',
} as any);

const response = await fetch('http://localhost:3000/api/upload', {
  method: 'POST',
  body: formData,

});


    console.log(response)
  
    if (!response.ok) throw new Error('Upload failed' + response.statusText)
  


    const data = await response.json()

    return data.url // S3 file URL
  }

  const pickImageNewTwo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: false,
    });

    console.log("C")
    if (!result.canceled) {
      const asset = result.assets[0];
      console.log("B")
      setImage(asset.uri);

      console.log("A")
      try {
      const fileBlob = await fetch(asset.uri).then(r => r.blob());

      if (asset && asset.fileName) {
      console.log("AT")
      await uploadFile(asset.uri, asset.fileName, asset.mimeType || "")
      console.log("UPLOADED")
      }
      } catch (error) {
        console.log("UPLOAD: "+ error)
      }

    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Pick and upload image" onPress={pickImageNewTwo} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {fileUrl && <Text>Uploaded to: {fileUrl}</Text>}
    </View>
  );
}
