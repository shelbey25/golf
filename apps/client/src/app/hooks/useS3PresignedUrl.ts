import { useState } from 'react';
import { Platform } from 'react-native';

interface PresignedUrlOptions {
  key: string;
  apiEndpoint?: string;
}

interface PresignedUrlResult {
  url: string | null;
  loading: boolean;
  error: string | null;
  getPresignedUrl: (key: string) => Promise<void>;
}

export default function useS3PresignedUrl(
  options?: Partial<PresignedUrlOptions>
): PresignedUrlResult {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For iOS simulator use localhost, for Android use 10.0.2.2
  const defaultEndpoint = Platform.select({
    web: '/api/s3-presigned-url',
    ios: 'http://localhost:3000/api/s3-presigned-url',
    android: 'http://10.0.2.2:3000/api/s3-presigned-url',
  });

  const getPresignedUrl = async (key: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = options?.apiEndpoint || defaultEndpoint;
      console.log('Fetching from:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setUrl(data.url);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return { url, loading, error, getPresignedUrl };
}