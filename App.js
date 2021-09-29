/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from './src/app/router/navigation';
export default function App() {
  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  );
}
