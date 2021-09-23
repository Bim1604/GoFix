import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from './src/app/router/navigation';
export default function App() {
  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  );
}
