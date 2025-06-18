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
    AdminScreen,
} from "./screens";



const Stack = createNativeStackNavigator<RootStackParamList>();
export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Atrium" component ={AtriumScreen}/>
            <Stack.Screen name= "SignIn" component = {SignInScreen}/>
            <Stack.Screen name= "Register" component = {RegisterScreen}/>
            {/*<Stack.Screen name= "Guest" component = {GuestScreen}/>*/}
            <Stack.Screen name= "UserMenu" component = {UserMenuScreen}/>
            <Stack.Screen name= "CreateMemberBulletin" component = {CreateMemberBulletinScreen}/>
            <Stack.Screen name= "EditMemberBulletin" component = {EditMemberBulletinScreen}/>
            <Stack.Screen name= "MemberBulletinListType" component = {MemberBulletinListTypeScreen}/>
            <Stack.Screen name= "MemberBulletinDetail" component = {MemberBulletinDetailScreen}/>
            <Stack.Screen name= "CreateOfficialBulletin" component = {CreateOfficialBulletinScreen}/>
            <Stack.Screen name= "EditOfficialBulletin" component = {EditOfficialBulletinScreen}/>
            <Stack.Screen name= "OfficialBulletinList" component = {OfficialBulletinListScreen}/>
            <Stack.Screen name= "OfficialBulletinDetail" component = {OfficialBulletinDetailScreen}/>
            <Stack.Screen name= "UserProfile" component  = {UserMemberProfileScreen}/>
            <Stack.Screen name= "UserSettings" component  = {UserSettingsScreen}/>
            <Stack.Screen name= "AdminScreen" component = {AdminScreen}/>
        </Stack.Navigator>
    )
}
