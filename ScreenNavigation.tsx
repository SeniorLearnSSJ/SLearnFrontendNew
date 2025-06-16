import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
    AtriumScreen,
    SignInScreen,
    
} from "./screens";



const Stack = createNativeStackNavigator();
export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Atrium" component ={AtriumScreen}/>


        
        </Stack.Navigator>
    )
}
            /*<Stack.Screen name="Atrium">
                {()=>(<AtriumScreen/>)}
            </Stack.Screen>*/