import React from 'react'
import { Redirect } from 'expo-router';
import { useAuth } from '@useAuth';

export default function Start() {
  const session = useAuth()?.session;

  if (session) {
    return <Redirect href={'/'} />;
  }

  return <Redirect href={'/(home)/(auth)/Auth'} />;
}