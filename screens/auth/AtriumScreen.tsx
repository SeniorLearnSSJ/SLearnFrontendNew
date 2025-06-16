import { RootStackParamList } from "../../types/TypeNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {useContext} from "react";
import {FontSizeContext} from "../../context/FontSizeContext";

type AtriumScreenProps = NativeStackScreenProps<RootStackParamList, "Atrium">;
export default function AtriumScreen({navigation}:AtriumScreenProps){
    const fontContext = useContext(FontSizeContext);
    

}