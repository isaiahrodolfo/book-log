import { Pressable, StyleSheet } from 'react-native'
import { Image, Text, Button, View } from 'tamagui'
import React from 'react'

export default function BookItem({ book, onPress }) {
  const coverImage = book.cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`
    : "https://openlibrary.org/images/icons/avatar_book-lg.png"; // Fallback image

  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri: coverImage }} style={{ width: 100, height: 150 }} />
      <Text>{book.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({})