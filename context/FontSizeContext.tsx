import { ReactNode, useState, useEffect } from "react";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontContextType, FontSizeProviderProps } from "../types/Interfaces";


const FontContext = React.createContext<FontContextType | undefined>(undefined);

/**
 * This is a provider that takes a parameter of interface type FontSizeProviderProp.  It makes the font size state managemetn available to all child components wrapped by the provider context object.
 * @param param0 Object that contains all child components wrappped by the provider.
 * @returns A react element that wraps its child components with the font size provider.
 */
const FontSizeProvider = ({ children }: FontSizeProviderProps) => {
  const [fontSize, setFontSize] = useState<number>(20);


const fontContextValue: FontContextType = {
  fontSize,
  setFontSize
};


/**
 * This effect loads font size stored in local storage.
 */

useEffect (()=>{
  const loadFontSize = async () =>{
    try {
      const stored = await AsyncStorage.getItem("fontSize");
      if (stored !== null){
        setFontSize(Number(stored));
      }}
      catch (error){
        console.error("Failed to load font size:", error);
      }
    };
    loadFontSize();
  }, [])


  /**
   * This effect saves font settings to local storage, for retrieval and persistence across app restarts.
   */
useEffect (() =>{
  const saveFontSize = async () =>{
    try {await AsyncStorage.setItem("fontSize", fontSize.toString());
  } catch (error){
    console.error("Failed to save font size:", error);
  }
};
saveFontSize();
}, [fontSize])
  return (
    <FontContext.Provider value={fontContextValue}>
      {children}
    </FontContext.Provider>
  );
};

export { FontContext, FontSizeProvider };
