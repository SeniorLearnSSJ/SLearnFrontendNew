import React from "react";
import { View, Pressable, Text } from "react-native";



/**
 * Defines value of toggle as 0, 1 or 2
 */
type ToggleValue = 0 | 1 | 2;

/**
 * Defines the shape of font switch props
 * Value:  Of type toggleValue
 * onValueChange:  Update the value of the toggle
 */
type FontSwitchProps = {
  value: ToggleValue;
  onValueChange: (newValue: ToggleValue) => void;
};

/**
 * Defines the functional component
 * @param param0 Takes params of type font switch props
 * @returns A pressable toggle with 3 possible values
 */

const FontSwitch: React.FC<FontSwitchProps> = ({ value, onValueChange }) => {
  const toggleSwitch = () => {
    const nextValue = (value + 1) % 3 as ToggleValue;
    onValueChange(nextValue);
  };

  const backgroundColors = ["gray", "yellow", "green"];
  const labels = ["Small", "Medium", "Large"];

  return (
    <Pressable onPress={toggleSwitch}>
      <View
        style={{
          width: 70,
          height: 30,
          backgroundColor: backgroundColors[value],
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
        }}
      >
        <Text style={{ color: "black", fontWeight: "bold" }}>
          {labels[value]}
        </Text>
      </View>
    </Pressable>
  );
};

export const fontSizeFromToggle = (value: ToggleValue): number =>{
  switch (value){
    case 0: return 16;
    case 1: return 20;
    case 2: return 24;
    default: return 20;
  }
}

export const toggleFromFontSize = (fontSize: number): ToggleValue =>{
  if (fontSize <-16) return 0;
  if (fontSize <=20) return 1;
  return 2;
};

export default FontSwitch;
