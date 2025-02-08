import { SizableText, Text, View } from 'tamagui'
import React from 'react'

export default function SubjectTag({ subject }) {
  return (
    <View>
      <Text>{subject}</Text>
      {/* <SizableText size="$4">{subject}</SizableText> */}
    </View>
  )
}