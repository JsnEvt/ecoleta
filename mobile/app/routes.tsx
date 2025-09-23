import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../app/Home'
import Points from '../app/Points'
import Detail from '../app/Detail'

const AppStack = createStackNavigator()

const Routes = () => {
  return (
    <AppStack.Navigator screenOptions={{
      cardStyle: {
        backgroundColor: '#f0f0f5',

      }
    }}>
      <AppStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <AppStack.Screen name="Points" component={Points} options={{ headerShown: false }} />
      <AppStack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}

export default Routes