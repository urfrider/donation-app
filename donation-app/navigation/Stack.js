import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../screens/detail/DetailScreen";
import AccountScreen from "../screens/account/AccountScreen";
import ShowAllScreen from "../screens/showAll/ShowAllScreen";

import colors from "../colors";
import CameraScreen from "../screens/camera/CameraScreen";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        animation: "fade",

        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        headerTitleAlign: "center",
      }}
    >
      <NativeStack.Screen name="Detail" component={DetailScreen} />
      <NativeStack.Screen name="Account" component={AccountScreen} />
      <NativeStack.Screen name="ShowAll" component={ShowAllScreen} />
      <NativeStack.Screen name="Scan QR Code" component={CameraScreen} />
    </NativeStack.Navigator>
  );
};

export default Stack;
