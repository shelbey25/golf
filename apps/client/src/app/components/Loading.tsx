import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "twrnc";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function LoadingScreen() {
    const windScale = useRef(new Animated.Value(1)).current;
    const cartJiggle = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      // Wind "breathing" animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(windScale, {
            toValue: 1.3,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(windScale, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease),
          }),
        ])
      ).start();
  
      // Golf cart jiggle animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(cartJiggle, {
            toValue: 3,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(cartJiggle, {
            toValue: -3,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(cartJiggle, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

  return (
    <View style={tw`flex-1 bg-stone-800 items-center justify-center`}>
     <Animated.View style={[tw`flex flex-row items-center gap-x-2`, {
          transform: [{ translateX: cartJiggle }],
        }]} ><Animated.View
        style={[
          tw``,
          {
            transform: [{ scale: windScale }],
            opacity: 1,
          },
        ]}
      >
        <Icon name="reorder-three-outline" size={60} color="white" />
      </Animated.View>

     
      <MaterialCommunityIcons
  name="golf-cart"
  size={80}
  color="white"
/>

      </Animated.View> 
   
    </View>
  );
}


