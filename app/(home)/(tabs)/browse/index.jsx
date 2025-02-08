import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from '@tamagui/scroll-view'
import { Button, Form, H4, Image, Input, Spinner, Text, View } from 'tamagui'
import { getBooks } from '@/api/books'
import { useRouter } from 'expo-router'

import BookItem from '@/components/BookItem'
import { useNavigation } from 'expo-router'

export default function Books() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const router = useRouter();

  async function Search() {
    // Do not search for empty queries
    if (!query.trim()) return;

    setLoading(true);

    try {
      const data = await getBooks(query, 30); // Fetch books
      setBooks(data.docs); // Update books state
      console.log("Books found:", data.docs); // Print to console
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form
        // alignItems="center"
        // minWidth={300}
        gap="$2"
        onSubmit={Search}
        borderWidth={1}
        // borderRadius="$4"
        // backgroundColor="$background"
        borderColor="$borderColor"
      // padding="$8" 
      >
        {/* <H4>{status[0].toUpperCase() + status.slice(1)}</H4> */}

        <Input onChangeText={setQuery} />

        <Form.Trigger asChild>
          <Button>
            Submit
          </Button>
        </Form.Trigger>
      </Form>

      {loading && <Spinner />}

      {books.length > 0 && (
        <ScrollView>
          {books.map((book) => {
            return (
              <View key={book.key} style={styles.container}>
                <BookItem book={book} onPress={() => router.push(`/browse/bookDetail?key=${book.key.substring(7)}&title=${encodeURIComponent(book.title)}`)} />
              </View>
            );
          })}
        </ScrollView>

      )}

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
});