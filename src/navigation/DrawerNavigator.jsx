import React from 'react';
import { TextInput } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: () => (
          <TextInput
            placeholder="🔍 Pesquisar produtos..."
            style={{
              backgroundColor: "#f2f2f2",
              width: 250,
              height: 40,
              borderRadius: 20,
              paddingHorizontal: 15,
            }}
          />
        ),
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
      />

      <Drawer.Screen
        name="Extensão de Cílios"
        component={ProductsScreen}
        initialParams={{
          category: "Extensão de Cílios",
        }}
      />

      <Drawer.Screen
        name="Body Splash"
        component={ProductsScreen}
        initialParams={{
          category: "Body Splash",
        }}
      />

      <Drawer.Screen
        name="Kits"
        component={ProductsScreen}
        initialParams={{
          category: "Kits",
        }}
      />

      <Drawer.Screen
        name="Acessórios"
        component={ProductsScreen}
        initialParams={{
          category: "Acessórios",
        }}
      />
    </Drawer.Navigator>
  );
}