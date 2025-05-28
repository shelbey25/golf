import React from 'react';
import { View, Text, Button, Image, ActivityIndicator, StyleSheet } from 'react-native';
import useS3PresignedUrl from '../hooks/useS3PresignedUrl';
import tw from '../../utils/tailwind';

const ImageCall: React.FC = () => {
  const { url, loading, error, getPresignedUrl } = useS3PresignedUrl();
  const imageKey = '1748425641817-IMG_0004.jpg';

  return (
    <View style={[tw`pt-20`, styles.container]}>
      <Button
        title="Load Image from S3"
        onPress={() => getPresignedUrl(imageKey)}
        disabled={loading}
      />
      
      {loading && <ActivityIndicator size="large" style={styles.loader} />}
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      {url && (
        <Image
          source={{ uri: url }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default ImageCall;