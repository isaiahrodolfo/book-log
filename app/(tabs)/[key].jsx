import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, Spinner } from 'tamagui';
import { getBookData } from '@/api/books';

export default function BookDetail() {
  const { key } = useLocalSearchParams();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookData() {
      try {
        const desc = await getBookData(key);
        setBookData(desc);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (key) {
      setLoading(true);
      fetchBookData();
    }
  }, [key]); // Runs when `key` changes

  return (
    <View>
      {/* <Text>Book Key: {key}</Text> */}
      {loading ? <Spinner /> : <Text>{bookData.description || "No description available"}</Text>}
    </View>
  );
}
