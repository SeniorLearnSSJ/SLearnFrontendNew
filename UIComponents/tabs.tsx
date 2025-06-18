import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontContext } from "../context/FontSizeContext";
import { useContext } from "react";


/**
 * Defines the shape of the tabs props.
 * tabs:  String array of labels for the tabs
 * selectedTab:  String label for the currently selected tab
 * setSelectedTab:  Function that updates value of selected tab
 */
type Props = {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

/**
 * Defines the functional component to render a horizontal tab menu
 * @param param0  Takes params of type tabs props
 * @returns A touchable list with the label of each tab
 */
const TabMenu = ({ tabs, selectedTab, setSelectedTab }: Props) => {
  const fontContext = useContext(FontContext);
  const renderTabs = () => {
    return tabs.map((label, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedTab(label);
        }}
      >
        <View style={styles.tab}>
          <Text
            style={[
              label === selectedTab ? styles.selectedText : styles.tabText,
              { fontSize: fontContext?.fontSize || 16 },
            ]}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return <View style={styles.container}>{renderTabs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    marginHorizontal: 20,
  },
  selectedText: {
    fontWeight: "bold",
    color: "blue",
  },
  tabText: {
    fontWeight: "normal",
    color: "black",
  },
});

export default TabMenu;
