import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { api } from '../../utils/api';
import Feed from './Feed';
import Profile from './Profile';
import Sessions from './Sessions';
import GolfClub from './GolfClub';

const Stack = createStackNavigator();

const FeedRouter = () => {
  
  return (
      <Stack.Navigator initialRouteName="FeedRouter">
        <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Stack.Screen name="My Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Sessions" component={Sessions} />
        <Stack.Screen name="Golf Club" component={GolfClub} />
      </Stack.Navigator>
  );
}

export default FeedRouter;
