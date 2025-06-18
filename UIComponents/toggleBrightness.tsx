import React from "react";
import { View, Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";

/**
 * Defines shape of brightness switch props.
 * Value:  A boolean holding the current value of the prop.
 * onValueChange:  A switch function to toggle the value of the prop.
 * fontSize:  Optionally sets value of font in switch.
 */

type BrightnessSwitchProps = {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  fontSize?: number;
};

/**
 * Defines the switch component
 * @param param0   a paramter of type brightness switch prop
 * @returns A pressable switch
 */

const BrightnessSwitch: React.FC<BrightnessSwitchProps> = ({
  value,
  onValueChange,
  fontSize = 16,
}) => {
  const toggleSwitch = () => {
    onValueChange(!value);
  };

  return (
    <Pressable onPress={toggleSwitch}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: value ? "lightblue" : "darkblue",
          },
          //justifyContent: "center",
          // alignItems: value ? "flex-end" : "flex-start",
        ]}
      >
        <Text style={[styles.label, { fontSize }]}>
          {value ? "Dark" : "Light"}
        </Text>

        <View
          style={[
            styles.toggleCircle,
            { alignSelf: value ? "flex-end" : "flex-start" },
          ]}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 70,
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
    position: "relative",
  },

  label: {
    color: "white",
    position: "relative",
  },

  toggleCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
  },
});

export default BrightnessSwitch;
