import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "./types/TypeNavigation";
import {
    AtriumScreen,
    SignInScreen,
    RegisterScreen,
    GuestScreen,
    UserMenuScreen,
    CreateMemberBulletinScreen,
    EditMemberBulletinScreen,
    MemberBulletinListTypeScreen,
    MemberBulletinDetailScreen,
    CreateOfficialBulletinScreen,
    EditOfficialBulletinScreen,
    OfficialBulletinListScreen,
    OfficialBulletinDetailScreen,
    UserMemberProfileScreen,
    UserSettingsScreen,
} from "./screens";



const Stack = createNativeStackNavigator<RootStackParamList>();
export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Atrium" component ={AtriumScreen}/>
            <Stack.Screen name= "SignIn" component = {SignInScreen}/>
            <Stack.Screen name= "Register" component = {RegisterScreen}/>
            <Stack.Screen name= "Guest" component = {GuestScreen}/>
            <Stack.Screen name= "UserMenu" component = {UserMenuScreen}/>


        
        </Stack.Navigator>
    )
}
