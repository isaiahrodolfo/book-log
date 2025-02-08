import React from 'react'
import { Redirect } from 'expo-router';
import { useAuth } from '@useAuth';

export default function Start() {
  return <Redirect href={'/(home)/(auth)/Auth'} />;
}