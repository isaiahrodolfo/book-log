import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, Spinner, ScrollView } from 'tamagui';
import { getBookData } from '@/api/books';

import { H2 } from 'tamagui';

export default function BookDetail() {
  const { title, key } = useLocalSearchParams();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(key);

  useEffect(() => {
    async function fetchBookData() {
      try {
        const data = await getBookData(key);

        if (!data) {
          console.warn("No data returned from API.");
          return;
        }

        console.log("Raw book data:", data);

        setBookData({
          ...data,
          has_description: typeof data.description === 'string',
        });

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
    <ScrollView>
      {loading && <Spinner />}
      {!loading && bookData ? (
        <>
          <H2>{title}</H2>
          <Text>{bookData.has_description ? bookData.description : "No description available"}</Text>
        </>
      ) : (
        !loading && <Text>Error loading book data.</Text>
      )}
    </ScrollView>
  );
}
