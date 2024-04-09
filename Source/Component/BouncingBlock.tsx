import { View, Image, Text } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  FadeIn,
  FadeOut,
  FadeInUp,
  FadeInLeft,
  FadeInDown,
} from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg';

const BOOST_SCALE = 2.5;
const BOOST_INTER_SCALE = 1.0;

export const BouncingBlock = ({char, color, image, height}:any) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale:
          /** withSequence allows to chain multiple animations */
            withSequence(
               /** withTiming shows the big scale for a specific time, here 100 ms */
              withTiming(BOOST_INTER_SCALE,{duration:100}),
              /** withSpring renders the light bouncing animation at the end */
              withSpring(BOOST_SCALE)
            ),
        },
      ],
    };
  });
  return (
    <Animated.View style={animatedStyles} entering={FadeIn}>
      {/* <Image
        source={image}
        style={{ height: height, aspectRatio: 1, resizeMode: 'contain' }}
      /> */}
      {/* <Text style={{ height: 100, aspectRatio: 1, fontWeight:"bold", fontSize:100, textAlign:"center", alignSelf:"center", color:color}}>
        {char}
      </Text> */}
      <SvgUri
            width={height}
            height={height}
            uri={image}
          />
    </Animated.View>
  );
};
