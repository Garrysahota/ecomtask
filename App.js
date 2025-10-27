import React from 'react';
import Roots from './src/navigation/Roots'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { THEME } from './src/constants/theme';

const App = () => {

  const linking = {
    prefixes: ['ecomtask://', ' https://io.pixelsoftwares.com/test.txt'],
    config: {
      screens: {
        BottomTab: {
          path: '',
          screens: {
            Home: 'home',
            Settings: 'settings',
          },
        },
        // ProductDetails: 'product/:id',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <StatusBar backgroundColor={THEME.BACKGROUND} barStyle={'light-content'} />
      <Roots />
    </NavigationContainer>
  )
}

export default App;