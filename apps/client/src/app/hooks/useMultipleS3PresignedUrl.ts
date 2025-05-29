import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface PresignedUrlOptions {
  apiEndpoint?: string;
}

interface PresignedUrlResult {
  urls: Record<string, string>; // Object with keys as image keys
  loading: boolean;
  error: string | null;
  getPresignedUrl: (userId: string, key: string) => Promise<void>;
  clearUrls: () => void; 
}

export default function useMultipleS3PresignedUrl(
  options?: Partial<PresignedUrlOptions>
): PresignedUrlResult {
    const [urls, setUrls] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //useEffect(() => {console.log(urls)}, [urls])
  
    const clearUrls = useCallback(() => {
      setUrls({});
    }, []);

  // For iOS simulator use localhost, for Android use 10.0.2.2
  const defaultEndpoint = Platform.select({
    web: '/api/s3-presigned-url',
    ios: 'http://localhost:3000/api/s3-presigned-url',
    android: 'http://10.0.2.2:3000/api/s3-presigned-url',
  });

  const getPresignedUrl = async (userId: string, key: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = options?.apiEndpoint || defaultEndpoint;
      
      // Skip if we already have this URL
      /*if (urls[key]) {
        setLoading(false);
        return;
      }*/

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setUrls(prev => ({ ...prev, [userId]: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  //const getUrl = (key: string) => urls[key] || null;

  return { urls, loading, error, getPresignedUrl, clearUrls };
}