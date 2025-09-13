import React from 'react';
import Home from '../Home';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"transparent"} translucent />
      <Home />
    </>
  )
}