import { Pressable, StyleSheet } from 'react-native'
import { Image, Text, Button, View } from 'tamagui'
import React, { useState, useEffect } from 'react'

export default function BookItem({ book, onPress }) {
  const [imageSize, setImageSize] = useState({ width: 100, height: 150 });

  const coverImage = book.cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`
    : "https://openlibrary.org/images/icons/avatar_book-lg.png"; // Fallback image

  useEffect(() => {
    Image.getSize(coverImage, (width, height) => {
      const aspectRatio = width / height;
      setImageSize({ width: 150, height: 150 / aspectRatio }); // Set a fixed width, adjust height
    });
  }, [coverImage]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: coverImage }} style={[styles.image, { width: imageSize.width, height: imageSize.height }]} />
        <Text style={styles.text}>{book.title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 8, // Adds spacing between the image and text
  },
  text: {
    textAlign: 'center', // Ensures text is centered
  },
});