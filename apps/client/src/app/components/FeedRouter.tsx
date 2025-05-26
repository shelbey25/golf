import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { api } from '../../utils/api';
import Feed from './Feed';
import Profile from './Profile';
import Sessions from './Sessions';
import GolfClub from './GolfClub';
import FindFriends from './FindFriends';
import ProfilePreview from './ProfilePreview';
import SessionPreview from './SessionPreview';

const Stack = createStackNavigator();

const FeedRouter = () => {
  
  return (
      <Stack.Navigator initialRouteName="FeedRouter">
        <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Stack.Screen name="Find Friends" component={FindFriends} options={{ headerShown: false, gestureDirection: 'horizontal-inverted', }} />
        <Stack.Screen name="Profile Preview" component={ProfilePreview} options={{ headerShown: false, gestureDirection: 'horizontal-inverted', }} />
        <Stack.Screen name="My Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Sessions" component={Sessions} options={{ headerStyle: {  } }} />
        <Stack.Screen name="Sessions Preview" component={SessionPreview} options={{ headerStyle: {  } }} />
        <Stack.Screen name="Golf Club" component={GolfClub} />
      </Stack.Navigator>
  );
}

export default FeedRouter;
