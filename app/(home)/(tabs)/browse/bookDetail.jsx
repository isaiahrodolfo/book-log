import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, Spinner, ScrollView, H2, H4 } from 'tamagui';
import { getBookData } from '@/api/books';

import SubjectTag from '@/components/SubjectTag';

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
          has_desciption: typeof (data.description) == 'string'
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
          {bookData.has_desciption ? <Text>{bookData.description}</Text> : <Text>No description available</Text>}
          {bookData.subjects && (
            <>
              <H4>Subjects</H4>
              {bookData.subjects.map((subject, index) => (
                <SubjectTag key={index} subject={subject} />
              ))}
            </>
          )}
        </>
      ) : (
        !loading && <Text>Error loading book data.</Text>
      )}
    </ScrollView>
  );
}
