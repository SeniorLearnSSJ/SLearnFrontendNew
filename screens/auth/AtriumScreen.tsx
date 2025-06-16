import React from "react";
import { RootStackParamList } from "../../types/TypeNavigation";
import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {useContext} from "react";
import {FontContext} from "../../context/FontSizeContext";
import { StyleSheet } from "react-native";

type AtriumScreenProps = NativeStackScreenProps<RootStackParamList, "Atrium">;
export default function AtriumScreen({navigation, route}:AtriumScreenProps){
    const fontContext = useContext(FontContext);
    return (
        <ScrollView>
        <View>
          <Text style={{ fontSize: fontContext?.fontSize || 16 }}>Home Screen</Text>
    
          <TouchableOpacity
            style={[styles.Button, { backgroundColor: "black" }]}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text
              style={{
                color: "white",
                fontSize: fontContext?.fontSize || 16,
                //backgroundColor: "black",
              }}
            >
              Go to login
            </Text>
          </TouchableOpacity>
    
          <TouchableOpacity
            style={[styles.Button, { backgroundColor: "black" }]}
            onPress={() => navigation.navigate("Guest")}
          >
            <Text
              style={{
                color: "white",
                fontSize: fontContext?.fontSize || 16,
                //backgroundColor: "black",
              }}
            >
              Continue as guest
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      );
    }
    
    /**
     * This contains the styling for the UI.
     */
    const styles = StyleSheet.create({
      Button: {
        
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#FFF5E6",
        borderRadius: 20,
        marginVertical: 10
      },
    });
