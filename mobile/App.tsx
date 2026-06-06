import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavegadorApp } from './src/navegacao/NavegadorApp';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavegadorApp />
    </>
  );
}
