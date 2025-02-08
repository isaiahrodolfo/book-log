import { Stack, Slot } from 'expo-router';

export default function BooksLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Search",
        }}
      />
      <Stack.Screen
        name="[key]"
        options={{
          title: "View",
        }}
      />
    </Stack>
  );
}
